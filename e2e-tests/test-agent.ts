#!/usr/bin/env tsx

import { config } from "dotenv";
import { AgentRuntime, IDatabaseAdapter, elizaLogger, UUID } from "@elizaos/core";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
config();

// Mock database adapter for testing
const mockDatabaseAdapter: IDatabaseAdapter = {
  db: null,
  
  // Basic connection methods
  async init(): Promise<void> {
    elizaLogger.info("Mock database initialized");
  },
  
  async close(): Promise<void> {
    elizaLogger.info("Mock database closed");
  },

  // Memory methods - simplified for testing
  async getMemories(params: any): Promise<any[]> {
    return [];
  },
  
  async getMemoryById(id: string): Promise<any | null> {
    return null;
  },
  
  async createMemory(memory: any, tableName: string, unique?: boolean): Promise<UUID> {
    elizaLogger.debug("Created memory:", memory);
    return "12345678-1234-1234-1234-123456789012" as UUID;
  },
  
  async removeMemory(memoryId: string): Promise<void> {
    elizaLogger.debug("Removed memory:", memoryId);
  },
  
  async removeAllMemories(roomId: string): Promise<void> {
    elizaLogger.debug("Removed all memories for room:", roomId);
  },
  
  async countMemories(roomId: string): Promise<number> {
    return 0;
  },

  // Account methods
  async getAccountById(userId: string): Promise<any | null> {
    return { id: userId, name: "Test User", email: "test@example.com" };
  },
  
  async createAccount(account: any): Promise<boolean> {
    return true;
  },

  // Actor methods  
  async getActorDetails(params: any): Promise<any[]> {
    return [];
  },
  
  async getActorById(actorId: string): Promise<any | null> {
    return null;
  },

  // Room methods
  async getRoomsForParticipant(entityId: UUID): Promise<UUID[]> {
    return [];
  },
  
  async getRoomsForParticipants(userIds: UUID[]): Promise<UUID[]> {
    return [];
  },

  // Participant methods
  async getParticipantsForAccount(userId: string): Promise<any[]> {
    return [];
  },
  
  async getParticipantsForRoom(roomId: UUID): Promise<UUID[]> {
    return [];
  },
  
  async getParticipantUserState(roomId: string, userId: string): Promise<"FOLLOWED" | "MUTED" | null> {
    return null;
  },
  
  async setParticipantUserState(roomId: string, userId: string, state: "FOLLOWED" | "MUTED" | null): Promise<void> {
    // No-op for testing
  },
  
  async createRoom(roomId?: string): Promise<string> {
    return roomId || "test-room-123";
  },
  
  async removeRoom(roomId: string): Promise<void> {
    elizaLogger.debug("Removed room:", roomId);
  },
  
  async addParticipant(userId: string, roomId: string): Promise<boolean> {
    return true;
  },
  
  async removeParticipant(userId: string, roomId: string): Promise<boolean> {
    return true;
  },

  // Relationship methods
  async getRelationships(params: any): Promise<any[]> {
    return [];
  },
  
  async getRelationship(params: any): Promise<any | null> {
    return null;
  },
  
  async createRelationship(params: any): Promise<boolean> {
    return true;
  },

  // Knowledge methods
  async searchKnowledge(params: any): Promise<any[]> {
    return [];
  },
  
  async createKnowledge(knowledge: any): Promise<void> {
    elizaLogger.debug("Created knowledge:", knowledge);
  },
  
  async removeKnowledge(id: string): Promise<void> {
    elizaLogger.debug("Removed knowledge:", id);
  },

  // Goal methods
  async getGoals(params: any): Promise<any[]> {
    return [];
  },
  
  async updateGoal(goal: any): Promise<void> {
    elizaLogger.debug("Updated goal:", goal);
  },
  
  async createGoal(goal: any): Promise<void> {
    elizaLogger.debug("Created goal:", goal);
  },
  
  async removeGoal(goalId: string): Promise<void> {
    elizaLogger.debug("Removed goal:", goalId);
  },
  
  async removeAllGoals(roomId: string): Promise<void> {
    elizaLogger.debug("Removed all goals for room:", roomId);
  },

  // Additional required methods for v2 compatibility
  async log(params: any): Promise<void> {
    elizaLogger.debug("Log entry:", params);
  },
  
  async getCachedEmbeddings(params: any): Promise<any[]> {
    return [];
  },
  
  async updateGoalStatus(params: any): Promise<void> {
    elizaLogger.debug("Updated goal status:", params);
  },
  
  async searchMemories(params: any): Promise<any[]> {
    return [];
  },
  
  async searchMemoriesByEmbedding(params: any): Promise<any[]> {
    return [];
  },
  
  async updateMemory(memory: any): Promise<boolean> {
    elizaLogger.debug("Updated memory:", memory);
    return true;
  },
  
  async getCachedEmbedding(params: any): Promise<any | null> {
    return null;
  },
  
  async cacheSimilarMemories(memory: any): Promise<void> {
    elizaLogger.debug("Cached similar memories for:", memory);
  },
  
  async getCachedMemories(params: any): Promise<any[]> {
    return [];
  },
  
  async searchCachedMemories(params: any): Promise<any[]> {
    return [];
  },
  
  async getMemoriesByRoomIds(params: any): Promise<any[]> {
    return [];
  },
  
  async removeAllMemoriesByRoomIds(roomIds: string[]): Promise<void> {
    elizaLogger.debug("Removed all memories for rooms:", roomIds);
  },
  
  async deleteManyMemories(params: any): Promise<void> {
    elizaLogger.debug("Deleted many memories:", params);
  },
  
  // v2 compatibility methods
  initialize: async () => {},
  runMigrations: async () => {},
  isReady: () => true
};

async function startTestAgent() {
  try {
    elizaLogger.info("Starting Ankr test agent...");

    // Get the character file path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const characterPath = path.join(__dirname, "character.json");

    elizaLogger.info("Character file path:", characterPath);
    elizaLogger.info("Starting agent with Ankr plugin...");

    // Start the agent server with CLI
    await startServer({
      character: characterPath,
      port: 3000,
      database: mockDatabaseAdapter,
      serverOnly: true
    });

    elizaLogger.info("Agent started successfully on port 3000");
    elizaLogger.info("API available at: http://localhost:3000");

  } catch (error) {
    elizaLogger.error("Failed to start test agent:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  elizaLogger.info('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  elizaLogger.info('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  startTestAgent().catch((error) => {
    elizaLogger.error("Unhandled error:", error);
    process.exit(1);
  });
}