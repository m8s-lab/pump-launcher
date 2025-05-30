import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { buyTokenIx } from "../lib/pumpfun/buy-token";
import { solanaConnection } from "../core/config/env";
import { executeJitoTx } from "../lib/jito";

export const bundleBuyIx = async (mint: PublicKey, keypairs: Keypair[], lamports: number[]) => {
    const cntBuyers = keypairs.length;
    const MAX_IX = 7;

    const txs: VersionedTransaction[] = [];
    let idx = 0;
    while (cntBuyers > 0) {
        const cnt = cntBuyers > MAX_IX ? MAX_IX : cntBuyers;

        const kps = keypairs.slice(idx * MAX_IX, idx * MAX_IX + cnt);
        const amounts = lamports.slice(idx * MAX_IX, idx * MAX_IX + cnt);
        const tx = await buyTokenIx(mint, amounts, kps, solanaConnection);
        if (!tx) return;

        txs.push(tx);

        idx++;
    }
    return txs;
}

export const launchAndBundleBuyIx = async (mint: PublicKey, keypairs: Keypair[], lamports: number[]) => {
    const cntBuyers = keypairs.length;
    const MAX_IX = 7;

    //   add launch transaction

    const txs: VersionedTransaction[] = [];
    let idx = 0;
    while (cntBuyers > 0) {
        const cnt = cntBuyers > MAX_IX ? MAX_IX : cntBuyers;

        const kps = keypairs.slice(idx * MAX_IX, idx * MAX_IX + cnt);
        const amounts = lamports.slice(idx * MAX_IX, idx * MAX_IX + cnt);
        const tx = await buyTokenIx(mint, amounts, kps, solanaConnection);
        if (!tx) return;

        txs.push(tx);

        idx++;
    }

    return txs;
}
