import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getNFTMetadataRequestSchema: z.ZodObject<{
    blockchain: z.ZodNativeEnum<typeof Blockchains>;
    contractAddress: z.ZodString;
    tokenId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
    contractAddress?: string;
    tokenId?: string;
}, {
    blockchain?: Blockchains;
    contractAddress?: string;
    tokenId?: string;
}>;
export declare const actionGetNFTMetadata: Action;
export default actionGetNFTMetadata;
