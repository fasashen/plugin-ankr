import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getBlockchainStatsRequestSchema: z.ZodObject<{
    blockchain: z.ZodNativeEnum<typeof Blockchains>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
}, {
    blockchain?: Blockchains;
}>;
export declare const actionGetBlockchainStats: Action;
export default actionGetBlockchainStats;
