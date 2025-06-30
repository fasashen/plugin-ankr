import { IDatabaseAdapter, Memory } from "@elizaos/core";
/**
 * Creates a mock database adapter for testing purposes
 * @param options Configuration options for the mock adapter
 * @returns A mock implementation of IDatabaseAdapter
 */
export declare const createMockDatabaseAdapter: ({ recentMessages, }?: {
    recentMessages?: Memory[];
}) => IDatabaseAdapter;
