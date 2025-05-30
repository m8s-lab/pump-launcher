import * as anchor from "@coral-xyz/anchor";
import { ComputeBudgetProgram, Connection, Keypair, PublicKey, Transaction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { PumpFunSDK } from "./pumpfun";
import { solanaConnection, userKp } from "../../core/config/env";
import { buildJitoTipIx, executeJitoTx } from "../jito";
import { logLogger } from "../../utils/logger";

export const buyTokenIx = async (
    mint: PublicKey,
    amounts: number[],
    keypairs: Keypair[],
    connection: Connection,
    priorityFee: number = 700_000
) => {
    try {
        const provider = new anchor.AnchorProvider(solanaConnection, new anchor.Wallet(userKp), {
            commitment: "processed",
        });
        const pumpfunSdk = new PumpFunSDK(provider);

        const transaction = new Transaction().add(
            ComputeBudgetProgram.setComputeUnitLimit({ units: 76_000 })
        ).add(
            ComputeBudgetProgram.setComputeUnitPrice({ microLamports: priorityFee })
        );

        keypairs.map(async (keypair, idx) => {
            const buyIxs = await pumpfunSdk.getBuyIxsBySolAmount(
                keypair.publicKey,
                mint,
                BigInt(amounts[idx]),
                BigInt(500),
                "confirmed"
            );
            buyIxs.map((ix) => transaction.add(ix));
        });
        transaction.add(
            buildJitoTipIx(userKp.publicKey)
        );

        const latestBlockhash = await connection.getLatestBlockhash();

        const messageV0 = new TransactionMessage({
            payerKey: keypairs[0].publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: transaction.instructions,
        }).compileToV0Message();

        const versionedTx = new VersionedTransaction(messageV0);
        versionedTx.sign(keypairs);

        return versionedTx;
    } catch (error) {
        logLogger.log(error as string);
        return false;
    }
}

export const buyToken = async (
    mint: PublicKey,
    amount: number,
    keypair: Keypair,
    connection: Connection,
    priorityFee: number = 700_000
) => {
    try {
        const versionedTx = await buyTokenIx(mint, [amount], [keypair], connection, priorityFee);
        if (!versionedTx) return false;

        const latestBlockhash = await connection.getLatestBlockhash();

        await executeJitoTx([versionedTx], 'processed', latestBlockhash);
        // await execTx(versionedTx, connection, "processed");

        return true;
    } catch (error) {
        logLogger.log(error as string);
        return false;
    }
}
