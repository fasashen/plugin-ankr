import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
/**
 * Schema for account balance requests
 */
export declare const getAccountBalanceRequestSchema: z.ZodObject<{
    blockchain: z.ZodOptional<z.ZodUnion<[z.ZodNativeEnum<typeof Blockchains>, z.ZodArray<z.ZodNativeEnum<typeof Blockchains>, "many">]>>;
    walletAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains | Blockchains[];
    walletAddress?: string;
}, {
    blockchain?: Blockchains | Blockchains[];
    walletAddress?: string;
}>;
export declare const actionGetAccountBalance: Action;
export default actionGetAccountBalance;
