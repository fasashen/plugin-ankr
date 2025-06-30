import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getNFTTransfersRequestSchema: z.ZodObject<{
    blockchain: z.ZodNativeEnum<typeof Blockchains>;
    contractAddress: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    fromAddress: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    toAddress: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    fromTimestamp: z.ZodOptional<z.ZodNumber>;
    toTimestamp: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    contractAddress?: string;
    fromAddress?: string;
    toAddress?: string;
    fromTimestamp?: number;
    toTimestamp?: number;
}, {
    blockchain?: Blockchains;
    contractAddress?: string;
    fromAddress?: string;
    toAddress?: string;
    fromTimestamp?: number;
    toTimestamp?: number;
}>;
export declare const actionGetNFTTransfers: Action;
export default actionGetNFTTransfers;
