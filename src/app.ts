// src/app.ts
import * as anchor from "@coral-xyz/anchor";
import { CA, IS_NEW_LAUNCH, NUM_BUNDLE_WALLETS, NUM_MAKERS, solanaConnection, TP_AMOUNT, userKp } from "./core/config/env";
import { BN } from "@coral-xyz/anchor";
import { sleep } from "./utils/sleep";
import fs from "fs";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { createMakers } from "./handler/create-makers";
import { bundleBuyIx, launchAndBundleBuyIx } from "./handler/bundle-buy";
import { getRandomFloat, getRandomInt } from "./utils/rand";
import { migrateTx } from "./handler/migrate";
import { executeJitoTx } from "./lib/jito";
import { buyAndSell } from "./handler/buy-sell";
import { PUMP_FUN } from "./core/constants";
import { BONDING_CURVE_SEED } from "./lib/pumpfun/pumpfun";
import { sellAndClose } from "./handler/sell-close";

const main = async () => {
    const balance = await solanaConnection.getBalance(userKp.publicKey);
    console.log("main user:", userKp.publicKey.toBase58());
    console.log("start balance:", (balance / LAMPORTS_PER_SOL).toFixed(2));

    console.log("generating bundler keypairs.");
    //  generate bundler wallets
    const bundlers = await createMakers(NUM_BUNDLE_WALLETS, 30 * LAMPORTS_PER_SOL);
    if (!bundlers) {
        console.log('failed to generate bundler keypairs');
        return;
    }

    console.log("generating maker keypairs.");
    //  generate maker wallets
    const makers = await createMakers(NUM_MAKERS, 30 * LAMPORTS_PER_SOL);
    if (!makers) {
        console.log('failed to generate maker keypairs');
        return;
    }

    let lamports: number[] = [];
    for (let i = 0; i < NUM_BUNDLE_WALLETS; i++) {
        lamports.push(getRandomFloat(10.0, 20.0));
    }

    console.log("building bundle buy transasctions.");

    //  launch token or set token address
    const buyTxs = IS_NEW_LAUNCH ? await launchAndBundleBuyIx(CA, bundlers, lamports)
        : await bundleBuyIx(CA, bundlers, lamports);
    if (!buyTxs) {
        console.log('failed to get buy transactions');
        return;
    }

    console.log("building migrate & buy transaction.");
    //  get migrate & buy tx
    const migTx = await migrateTx(CA, bundlers[0]);

    console.log("executing versioned transactions with jito bundle.");
    //  bundle all transactions
    try {
        await executeJitoTx([...buyTxs, migTx], "confirmed", null);
    } catch (e) {
        console.log('failed to execute bundle buy & migrate:', e);
    }

    console.log("start making volume");
    const pool = PublicKey.findProgramAddressSync(
        [Buffer.from(BONDING_CURVE_SEED), CA.toBuffer()],
        new PublicKey(PUMP_FUN.PROGRAM_ID)
    )[0];
    //  make volume till it can get enough profit
    while (1) {
        //  get vault balance and check
        const balance = await solanaConnection.getBalance(pool);
        if (balance > TP_AMOUNT * LAMPORTS_PER_SOL) {
            console.log("TP amount reached, sell tokens");
            await sellAndClose(CA, makers);
            await sellAndClose(CA, bundlers);
            return;
        }

        //  make volume if needed
        const idx = getRandomInt(0, makers.length);
        await buyAndSell(CA, makers[idx]);
    }
}

main();
