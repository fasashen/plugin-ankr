import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getInteractionsRequestSchema: z.ZodObject<{
    address: z.ZodString;
    blockchain: z.ZodOptional<z.ZodNativeEnum<typeof Blockchains>>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    address?: string;
}, {
    blockchain?: Blockchains;
    address?: string;
}>;
export declare const actionGetInteractions: Action;
export default actionGetInteractions;
