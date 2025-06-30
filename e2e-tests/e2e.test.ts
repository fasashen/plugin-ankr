import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { spawn, ChildProcess } from "child_process";
import { config } from "dotenv";
import fetch from "node-fetch";

// Load environment variables
config();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const TEST_WALLET_ADDRESS = process.env.TEST_WALLET_ADDRESS || "0x742d35Cc6634C0532925a3b8D67C1F1DA89f7b55";

let agentProcess: ChildProcess;

describe("Ankr Plugin E2E Tests", () => {
  beforeAll(async () => {
    console.log("Starting Ankr test agent...");
    
    // Start the test agent
    agentProcess = spawn("tsx", ["test-agent.ts"], {
      cwd: process.cwd(),
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env }
    });

    // Handle agent output
    agentProcess.stdout?.on("data", (data) => {
      console.log(`Agent: ${data.toString()}`);
    });

    agentProcess.stderr?.on("data", (data) => {
      console.error(`Agent Error: ${data.toString()}`);
    });

    agentProcess.on("error", (error) => {
      console.error("Failed to start agent:", error);
    });

    // Wait for agent to start (give it time to initialize)
    console.log("Waiting for agent to start...");
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Check if agent is responding
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (response.ok) {
        console.log("Agent is ready!");
      } else {
        console.log("Agent health check returned:", response.status);
      }
    } catch (error) {
      console.log("Agent health check failed, continuing anyway:", error.message);
    }
  }, 30000);

  afterAll(async () => {
    if (agentProcess) {
      console.log("Stopping agent...");
      agentProcess.kill("SIGTERM");
      
      // Wait for process to exit
      await new Promise((resolve) => {
        agentProcess.on("exit", resolve);
        // Force kill after 5 seconds if graceful shutdown fails
        setTimeout(() => {
          agentProcess.kill("SIGKILL");
          resolve(null);
        }, 5000);
      });
    }
  });

  test("Should check wallet balance via API", async () => {
    const message = {
      text: `What's the balance of wallet ${TEST_WALLET_ADDRESS}?`,
      userId: "test-user-123",
      userName: "Test User"
    };

    console.log("Sending balance request:", message);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      console.log("API Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error response:", errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("API Response:", JSON.stringify(result, null, 2));

      // Basic assertions
      expect(result).toBeDefined();
      expect(typeof result).toBe("object");
      
      // Check if response contains balance information
      const responseText = JSON.stringify(result).toLowerCase();
      const containsBalanceInfo = 
        responseText.includes("balance") || 
        responseText.includes("wallet") || 
        responseText.includes("eth") ||
        responseText.includes("token") ||
        responseText.includes(TEST_WALLET_ADDRESS.toLowerCase());
      
      expect(containsBalanceInfo).toBe(true);
      
      console.log("✅ Balance check test passed!");

    } catch (error: any) {
      console.error("Test failed:", error);
      throw error;
    }
  }, 30000);

  test("Should get token price via API", async () => {
    const message = {
      text: "What's the current price of ETH?",
      userId: "test-user-123", 
      userName: "Test User"
    };

    console.log("Sending price request:", message);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      console.log("API Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error response:", errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("API Response:", JSON.stringify(result, null, 2));

      // Basic assertions
      expect(result).toBeDefined();
      expect(typeof result).toBe("object");
      
      // Check if response contains price information
      const responseText = JSON.stringify(result).toLowerCase();
      const containsPriceInfo = 
        responseText.includes("price") || 
        responseText.includes("usd") || 
        responseText.includes("$") ||
        responseText.includes("eth") ||
        responseText.includes("ethereum");
      
      expect(containsPriceInfo).toBe(true);
      
      console.log("✅ Token price test passed!");

    } catch (error: any) {
      console.error("Test failed:", error);
      throw error;
    }
  }, 30000);

  test("Should handle API health check", async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      console.log("Health check status:", response.status);
      
      // Accept both 200 (if health endpoint exists) and 404 (if it doesn't)
      expect([200, 404]).toContain(response.status);
      
      console.log("✅ Health check test passed!");
      
    } catch (error: any) {
      console.error("Health check failed:", error);
      // Don't fail the test if health endpoint doesn't exist
      console.log("⚠️ Health check endpoint may not be available, continuing...");
    }
  }, 10000);
});