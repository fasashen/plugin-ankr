import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getTransactionsByAddressRequestSchema: z.ZodObject<{
    blockchain: z.ZodNativeEnum<typeof Blockchains>;
    address: z.ZodString;
    includeLogs: z.ZodDefault<z.ZodBoolean>;
    descOrder: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    address?: string;
    descOrder?: boolean;
    includeLogs?: boolean;
}, {
    blockchain?: Blockchains;
    address?: string;
    descOrder?: boolean;
    includeLogs?: boolean;
}>;
export declare const actionGetTransactionsByAddress: Action;
export default actionGetTransactionsByAddress;
