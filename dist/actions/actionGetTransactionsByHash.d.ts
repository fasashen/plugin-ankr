import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getTransactionsByHashRequestSchema: z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodNativeEnum<typeof Blockchains>>;
    transactionHash: z.ZodString;
    includeLogs: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    includeLogs?: boolean;
    transactionHash?: string;
}, {
    blockchain?: Blockchains;
    includeLogs?: boolean;
    transactionHash?: string;
}>;
export declare const actionGetTransactionsByHash: Action;
export default actionGetTransactionsByHash;
