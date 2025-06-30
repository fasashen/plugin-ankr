import { IDatabaseAdapter, Memory } from "@elizaos/core";
import { vi } from "vitest";

/**
 * Creates a mock database adapter for testing purposes
 * @param options Configuration options for the mock adapter
 * @returns A mock implementation of IDatabaseAdapter
 */
export const createMockDatabaseAdapter = ({
  recentMessages = [],
}: {
  recentMessages?: Memory[];
} = {}): IDatabaseAdapter => ({
  // Core
  init: vi.fn(),
  close: vi.fn(),
  initialize: vi.fn(),
  runMigrations: vi.fn(),
  isReady: vi.fn().mockReturnValue(true),

  // Entity
  getEntityByIds: vi.fn().mockResolvedValue(null),
  getEntitiesForRoom: vi.fn().mockResolvedValue([]),
  createEntities: vi.fn().mockResolvedValue(true),
  updateEntity: vi.fn(),

  // Component
  getComponent: vi.fn().mockResolvedValue(null),
  getComponents: vi.fn().mockResolvedValue([]),
  createComponent: vi.fn().mockResolvedValue(true),
  updateComponent: vi.fn(),
  deleteComponent: vi.fn(),

  // Memory
  getMemories: vi.fn().mockResolvedValue(recentMessages),
  getMemoriesByRoomIds: vi.fn().mockResolvedValue([]),
  getMemoryById: vi.fn().mockResolvedValue(null),
  getMemoriesByIds: vi.fn().mockResolvedValue([]),
  getCachedEmbeddings: vi.fn().mockResolvedValue([]),
  log: vi.fn(),
  getLogs: vi.fn().mockResolvedValue([]),
  deleteLog: vi.fn(),
  searchMemories: vi.fn().mockResolvedValue([]),
  createMemory: vi.fn(),
  updateMemory: vi.fn().mockResolvedValue(true),
  deleteMemory: vi.fn(),
  deleteAllMemories: vi.fn(),
  countMemories: vi.fn().mockResolvedValue(0),

  // World & Room
  getWorld: vi.fn().mockResolvedValue(null),
  getAllWorlds: vi.fn().mockResolvedValue([]),
  createWorld: vi.fn().mockResolvedValue("mock-uuid"),
  updateWorld: vi.fn(),
  removeWorld: vi.fn(),
  updateRoom: vi.fn(),
  deleteRoom: vi.fn(),
  getRoomsForParticipant: vi.fn().mockResolvedValue([]),
  getRoomsForParticipants: vi.fn().mockResolvedValue([]),
  removeParticipant: vi.fn().mockResolvedValue(true),
  setParticipantUserState: vi.fn(),

  // Relationships
  createRelationship: vi.fn().mockResolvedValue(true),
  getRelationship: vi.fn().mockResolvedValue(null),
  getRelationships: vi.fn().mockResolvedValue([]),

  // Agent
  createAgent: vi.fn().mockResolvedValue("mock-uuid"),
  getAgent: vi.fn().mockResolvedValue(null),
  getAgents: vi.fn().mockResolvedValue([]),
  updateAgent: vi.fn(),
  deleteAgent: vi.fn(),

  // Cache
  getCache: vi.fn().mockResolvedValue(null),
  setCache: vi.fn(),
  deleteCache: vi.fn(),

  // Task
  createTask: vi.fn().mockResolvedValue("mock-uuid"),
  getTasks: vi.fn().mockResolvedValue([]),
  getTasksByName: vi.fn().mockResolvedValue([]),
  getTask: vi.fn().mockResolvedValue(null),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),

  // Additional required stubs for full IDatabaseAdapter compliance
  getRoomsByIds: vi.fn().mockResolvedValue([]),
  createRooms: vi.fn().mockResolvedValue([]),
  deleteRoomsByWorldId: vi.fn(),
  getRoomsByWorld: vi.fn().mockResolvedValue([]),

  // Add these to your mock object:
  db: {},
  getConnection: vi.fn(),
  // ensureAgentExists: vi.fn(), // Removed as not in v2 interface
  ensureEmbeddingDimension: vi.fn(),

  // Participants
  getParticipantsForEntity: vi.fn().mockResolvedValue([]),
  getParticipantsForRoom: vi.fn().mockResolvedValue([]),
  addParticipantsRoom: vi.fn(),
  getParticipantUserState: vi.fn(),

  // New stubs
  updateRelationship: vi.fn(),
  getMemoriesByWorldId: vi.fn().mockResolvedValue([]),
  deleteManyMemories: vi.fn(),
});
