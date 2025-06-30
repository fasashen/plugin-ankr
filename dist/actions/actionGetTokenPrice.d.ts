import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
/**
 * Schema for token price requests
 */
export declare const getTokenPriceRequestSchema: z.ZodObject<{
    blockchain: z.ZodNativeEnum<typeof Blockchains>;
    contractAddress: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    contractAddress?: string;
}, {
    blockchain?: Blockchains;
    contractAddress?: string;
}>;
export declare const actionGetTokenPrice: Action;
export default actionGetTokenPrice;
