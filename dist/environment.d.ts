import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";
export declare const ANKR_ENDPOINT = "https://rpc.ankr.com/multichain/";
export declare const ankrEnvSchema: z.ZodObject<{
    ANKR_API_KEY: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ANKR_API_KEY?: string;
}, {
    ANKR_API_KEY?: string;
}>;
export type ankrConfig = z.infer<typeof ankrEnvSchema>;
export declare function getConfig(): ankrConfig;
export declare function validateAnkrConfig(runtime: IAgentRuntime): Promise<ankrConfig>;
