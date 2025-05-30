// src/core/config/env.ts

import { Cluster, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import * as fs from 'fs'
import { get } from 'env-var';
import 'dotenv/config';
import { DEVNET_PROGRAM_ID, MAINNET_PROGRAM_ID } from '@raydium-io/raydium-sdk';
import NodeWallet from '@jito-lab/provider/dist/esm/nodewallet';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
    NODE_ENV: get('NODE_ENV').default('development').asString(),

    SOLANA_MAINNET_RPC: get('SOLANA_MAINNET_RPC').default('https://api.mainnet-beta.solana.com').asString(),
    SOLANA_DEVNET_RPC: get('SOLANA_DEVNET_RPC').default('https://api.devnet.solana.com').asString(),

    PRIVATE_KEY_PATH: get('PRIVATE_KEY_PATH').required().asString(),
};

export const NUM_MAKERS = 1000;
export const IS_NEW_LAUNCH = false;
export const INITIAL_BUY_LAMPORTS = 2 * LAMPORTS_PER_SOL;
export const NUM_BUNDLE_WALLETS = 20;
export const MIGRATE_BUY_LAMPORTS = 10 * LAMPORTS_PER_SOL;
export const TP_AMOUNT = 120 * LAMPORTS_PER_SOL;

//  ca on pump.fun in case IS_NEW_LAUNCH = false
export const CA = new PublicKey("jV7diGWdEcveTDPfLjWqEToJz428E195WXyvbPGpump");

//  metadata in case IS_NEW_LAUNCH = true
export const NEW_NAME = "ERIC TRUMP";
export const NEW_SYMBOL = "ERICTRUMP";
export const NEW_URI_PATH = "./img/token.png";

export const JITO_FEE = 100_000;

export const userKp = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(envs.PRIVATE_KEY_PATH, 'utf-8'))),
    { skipValidation: true },
);
export const userWallet = new NodeWallet(userKp);

const cluster: Cluster = "mainnet-beta";

export const solanaConnection = cluster.toString() == "mainnet-beta"
    ? new Connection(envs.SOLANA_MAINNET_RPC)
    : new Connection(envs.SOLANA_DEVNET_RPC);

export const raydiumProgramId = cluster.toString() == "mainnet-beta"
    ? MAINNET_PROGRAM_ID
    : DEVNET_PROGRAM_ID;

export const feeDestination = cluster.toString() == "mainnet-beta"
    ? new PublicKey("7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5") // Mainnet
    : new PublicKey("3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR"); // Devnet
