import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getNFTHoldersRequestSchema: z.ZodObject<{
    blockchain: z.ZodDefault<z.ZodNativeEnum<typeof Blockchains>>;
    contractAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    contractAddress?: string;
}, {
    blockchain?: Blockchains;
    contractAddress?: string;
}>;
export declare const actionGetNFTHolders: Action;
export default actionGetNFTHolders;
