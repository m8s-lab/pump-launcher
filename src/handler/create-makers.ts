import { ComputeBudgetProgram, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { solanaConnection, userKp } from "../core/config/env";
import * as fs from 'fs';
import { execTx } from "../utils/web3";

export const createMakers = async (numMakers: number, balance: number) => {
    const keypairs: Keypair[] = [];
    keypairs.push(userKp);

    for (let i = 0; i < numMakers; i++) {
        const newKp = Keypair.generate();
        // save new keypair to file
        try {
            fs.promises.writeFile(`./keys/${newKp.publicKey.toBase58()}`, newKp.secretKey, { encoding: 'utf8' });
            keypairs.push(newKp);
        } catch (e) {
            console.error('Error write makers to file:', e);
            return false;
        }
    }

    const MAX_IX = 7;
    let idx = 0;
    const lamports = balance / numMakers;
    while (numMakers > 0) {
        const tx = new Transaction().add(
            ComputeBudgetProgram.setComputeUnitLimit({ units: 180_000 })
        ).add(
            ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10_000 })
        );
        const cnt = numMakers > MAX_IX ? MAX_IX : numMakers;

        for (let i = 0; i < cnt; i++, idx++) {
            tx.add(SystemProgram.transfer({
                fromPubkey: keypairs[idx].publicKey,
                toPubkey: keypairs[idx + 1].publicKey,
                lamports,
            }));
        }

        idx -= cnt;
        tx.feePayer = keypairs[idx].publicKey;
        tx.recentBlockhash = (await solanaConnection.getLatestBlockhash()).blockhash;

        for (let i = 0; i < cnt; i++, idx++) {
            tx.partialSign(keypairs[idx]);
        }

        try {
            //  execute transaction
            await execTx(tx, solanaConnection, "confirmed");
        } catch (e) {
            console.error('Error distribute lamports:', e);
            return false;
        }
        numMakers -= MAX_IX;
    }

    return keypairs;
}
