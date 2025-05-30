// src/core/constants/index.ts

import { PublicKey } from "@solana/web3.js";

export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
};

export const ONE_HOUR = 1 * 60 * 60 * 1000  //  1 hr
export const ONE_MIN = 1 * 60 * 1000;       //  1 min
export const ONE_SEC = 1 * 1000             //  1 sec

export const PUMP_FUN = {
    PROGRAM_ID: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
    MINT_AUTH: new PublicKey("TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM"),
    FEE_RECEIPT: new PublicKey("CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM"),
    AMM_PROGRAM_ID: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
    MIGRATION: "39azUYFWPz3VHgKCf3VChUwbpURdCHRxjWVowf5jUJjg",

    CREATE_IX_DISCRIMINATOR: Buffer.from([0x18, 0x1e, 0xc8, 0x28, 0x05, 0x1c, 0x07, 0x77]),
    CREATE_CPI_DISCRIMINATOR: Buffer.from([0xe4, 0x45, 0xa5, 0x2e, 0x51, 0xcb, 0x9a, 0x1d, 0x1b, 0x72, 0xa9, 0x4d, 0xde, 0xeb, 0x63, 0x76]),

    MIGRATE_IX_DISCRIMINATOR: Buffer.from([0x9b, 0xea, 0xe7, 0x92, 0xec, 0x9e, 0xa2, 0x1e]),
    MIGRATE_CPI_DISCRIMINATOR: Buffer.from([0xe4, 0x45, 0xa5, 0x2e, 0x51, 0xcb, 0x9a, 0x1d, 0xb1, 0x31, 0x0c, 0xd2, 0xa0, 0x76, 0xa7, 0x74]),

    BUY_CPI_DISCRIMINATOR: Buffer.from([0xe4, 0x45, 0xa5, 0x2e, 0x51, 0xcb, 0x9a, 0x1d, 0x67, 0xf4, 0x52, 0x1f, 0x2c, 0xf5, 0x77, 0x77])
};