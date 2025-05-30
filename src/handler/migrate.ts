import { Keypair, PublicKey, Transaction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { solanaConnection } from "../core/config/env";

export const migrateTx = async (mint: PublicKey, migrator: Keypair) => {
    const tx = new Transaction();

    const latestBlockhash = await solanaConnection.getLatestBlockhash();

    const messageV0 = new TransactionMessage({
        payerKey: migrator.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: tx.instructions,
    }).compileToV0Message();

    const versionedTx = new VersionedTransaction(messageV0);
    versionedTx.sign([migrator]);

    return versionedTx;
}
