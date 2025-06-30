import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getTokenTransfersRequestSchema: z.ZodObject<{
    blockchain: z.ZodNativeEnum<typeof Blockchains>;
    address: z.ZodString;
    contractAddress: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    fromTimestamp: z.ZodOptional<z.ZodNumber>;
    toTimestamp: z.ZodOptional<z.ZodNumber>;
    descOrder: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    address?: string;
    contractAddress?: string;
    fromTimestamp?: number;
    toTimestamp?: number;
    descOrder?: boolean;
}, {
    blockchain?: Blockchains;
    address?: string;
    contractAddress?: string;
    fromTimestamp?: number;
    toTimestamp?: number;
    descOrder?: boolean;
}>;
export declare const actionGetTokenTransfers: Action;
export default actionGetTokenTransfers;
