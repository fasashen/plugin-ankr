import { Action } from "@elizaos/core";
import { z } from "zod";
import { Blockchains } from "../ankr/blockchains";
export declare const getCurrenciesRequestSchema: z.ZodObject<{
    blockchain: z.ZodNativeEnum<typeof Blockchains>;
}, "strip", z.ZodTypeAny, {
    blockchain?: Blockchains;
}, {
    blockchain?: Blockchains;
}>;
export declare const actionGetCurrencies: Action;
export default actionGetCurrencies;
