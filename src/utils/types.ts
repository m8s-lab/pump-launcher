import { PublicKey } from "@solana/web3.js";

export type CreateTokenMetadata = {
    name: string;
    symbol: string;
    description: string;
    file: Blob;
    twitter?: string;
    telegram?: string;
    website?: string;
};

export type PumpCreateData = {
    name: string;
    symbol: string;
    uri: string;
    mint: PublicKey;
    bondingCurve: PublicKey;
    user: PublicKey;
};

export type PumpMigrateData = {
    // 16 - discriminator
    // 8 - timestamp
    // 2 - index
    // 32 - creator
    baseMint: PublicKey;
    quoteMint: PublicKey;
    // 1 - baseMintDecimals
    // 1 - quoteMintDecimals
    // 8 - baseAmountIn
    // 8 - quoteAmountIn
    // 8 - poolBaseAmount
    // 8 - poolQuoteAmount
    // 8 - minimumLiquidity
    // 8 - initialLiquidity
    // 8 - lpTokenAmountOut
    // 1 - poolBump
    pool: PublicKey;
    // 32 - lpMint
    // 32 - userBaseTokenAccount
    // 32 - userQuoteTOkenAccount
};

export type Socials = {
    website?: string;
    twitter?: string;
    telegram?: string;
    // description?: string;
};
