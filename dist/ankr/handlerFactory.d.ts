import { HandlerCallback, IAgentRuntime, Memory, State } from "@elizaos/core";
import { AnkrProvider } from "@ankr.com/ankr.js";
import { z } from "zod";
export type AnkrHandlerOptions<TRequest, TResponse> = {
    methodName: string;
    methodHandler: (provider: AnkrProvider, params: TRequest) => Promise<TResponse>;
    requestSchema: z.ZodType<TRequest>;
    requestValidator: (content: unknown) => content is TRequest;
    responseFormatter: (request: TRequest, response: TResponse) => string;
};
export declare function createAnkrHandler<TRequest, TResponse>({ methodName, requestValidator: validator, methodHandler: apiMethod, responseFormatter: formatter, requestSchema: schema, }: AnkrHandlerOptions<TRequest, TResponse>): (runtime: IAgentRuntime, message: Memory, state?: State, options?: {
    [key: string]: unknown;
}, callback?: HandlerCallback) => Promise<boolean>;
