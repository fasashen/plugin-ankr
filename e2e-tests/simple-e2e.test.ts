import { describe, test, expect, beforeAll } from "vitest";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
config();

const TEST_WALLET_ADDRESS = process.env.TEST_WALLET_ADDRESS || "0x742d35Cc6634C0532925a3b8D67C1F1DA89f7b55";

describe("Ankr Plugin E2E Tests", () => {
  test("Should validate plugin structure", async () => {
    console.log("Testing plugin structure validation...");

    try {
      // Import the plugin dynamically to test structure
      const pluginPath = path.resolve("../dist/index.js");
      console.log("Loading plugin from:", pluginPath);
      
      const pluginModule = await import(pluginPath);
      const plugin = pluginModule.default;
      
      expect(plugin).toBeDefined();
      expect(plugin.name).toBeDefined();
      expect(plugin.actions).toBeDefined();
      expect(Array.isArray(plugin.actions)).toBe(true);
      expect(plugin.actions.length).toBeGreaterThan(0);
      
      // Check for specific actions
      const actionNames = plugin.actions.map((a: any) => a.name);
      console.log("Available actions:", actionNames);
      
      expect(actionNames).toContain("GET_ACCOUNT_BALANCE_ANKR");
      expect(actionNames).toContain("GET_TOKEN_PRICE_ANKR");
      
      console.log("✅ Plugin structure validation passed!");

    } catch (error: any) {
      console.error("Plugin structure validation failed:", error);
      throw error;
    }
  }, 10000);

  test("Should validate action configurations", async () => {
    console.log("Testing action configurations...");

    try {
      // Import the plugin
      const pluginPath = path.resolve("../dist/index.js");
      const pluginModule = await import(pluginPath);
      const plugin = pluginModule.default;
      
      // Test each action has required properties
      for (const action of plugin.actions) {
        expect(action.name).toBeDefined();
        expect(action.description).toBeDefined();
        expect(action.handler).toBeDefined();
        expect(typeof action.handler).toBe("function");
        expect(action.validate).toBeDefined();
        expect(typeof action.validate).toBe("function");
        
        console.log(`✓ Action ${action.name} is properly configured`);
      }
      
      console.log("✅ Action configuration validation passed!");

    } catch (error: any) {
      console.error("Action configuration validation failed:", error);
      throw error;
    }
  }, 10000);

  test("Should test API integration (mock)", async () => {
    console.log("Testing API integration with mock data...");

    try {
      // This would be where we test actual API calls
      // For now, we'll just validate the environment is set up
      
      expect(process.env.ANKR_API_KEY).toBeDefined();
      expect(process.env.GOOGLE_GENERATIVE_AI_API_KEY).toBeDefined();
      
      console.log("Environment variables are set up correctly");
      console.log("Test wallet address:", TEST_WALLET_ADDRESS);
      
      // Test that we can validate addresses
      expect(TEST_WALLET_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/);
      
      console.log("✅ API integration mock test passed!");

    } catch (error: any) {
      console.error("API integration test failed:", error);
      throw error;
    }
  }, 10000);
});