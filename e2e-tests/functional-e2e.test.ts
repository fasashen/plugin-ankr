import { describe, test, expect } from "vitest";
import { config } from "dotenv";
import { spawn, ChildProcess } from "child_process";
import { promises as fs } from "fs";
import path from "path";

// Load environment variables
config();

const TEST_WALLET_ADDRESS = process.env.TEST_WALLET_ADDRESS || "0x742d35Cc6634C0532925a3b8D67C1F1DA89f7b55";

describe("Ankr Plugin Functional E2E Tests", () => {
  test("Should run existing Ankr plugin tests successfully", async () => {
    console.log("Running existing Ankr plugin test suite...");

    // Change to parent directory and run the existing tests
    const parentDir = path.resolve("..");
    
    return new Promise((resolve, reject) => {
      const testProcess = spawn("pnpm", ["test"], {
        cwd: parentDir,
        stdio: ["pipe", "pipe", "pipe"],
        env: { ...process.env }
      });

      let stdout = "";
      let stderr = "";

      testProcess.stdout?.on("data", (data) => {
        const output = data.toString();
        stdout += output;
        console.log(output);
      });

      testProcess.stderr?.on("data", (data) => {
        const output = data.toString();
        stderr += output;
        console.error(output);
      });

      testProcess.on("close", (code) => {
        console.log(`Test process exited with code ${code}`);
        
        if (code === 0) {
          console.log("✅ Existing tests passed successfully!");
          
          // Check that tests actually ran and passed
          expect(stdout).toContain("✅");
          expect(stdout.toLowerCase()).toMatch(/(passed|success)/);
          
          resolve(code);
        } else {
          console.error("❌ Tests failed with exit code:", code);
          reject(new Error(`Tests failed with exit code ${code}`));
        }
      });

      testProcess.on("error", (error) => {
        console.error("Failed to start test process:", error);
        reject(error);
      });
    });
  }, 60000); // 60 second timeout

  test("Should validate package.json configuration", async () => {
    console.log("Validating package.json configuration...");

    try {
      const packagePath = path.resolve("../package.json");
      const packageData = await fs.readFile(packagePath, "utf-8");
      const packageJson = JSON.parse(packageData);

      // Validate basic structure
      expect(packageJson.name).toBe("@elizaos-plugins/plugin-ankr");
      expect(packageJson.version).toBeDefined();
      expect(packageJson.main).toBe("dist/index.js");
      expect(packageJson.types).toBe("dist/index.d.ts");

      // Validate dependencies
      expect(packageJson.dependencies).toBeDefined();
      expect(packageJson.dependencies["@elizaos/core"]).toBeDefined();
      expect(packageJson.dependencies["@ankr.com/ankr.js"]).toBeDefined();

      // Validate v2 configuration
      expect(packageJson.agentConfig).toBeDefined();
      expect(packageJson.agentConfig.pluginType).toBe("elizaos:client:2.0.0");
      expect(packageJson.agentConfig.pluginParameters).toBeDefined();
      expect(packageJson.agentConfig.pluginParameters.ANKR_API_KEY).toBeDefined();

      console.log("✅ Package.json configuration is valid!");
    } catch (error: any) {
      console.error("Package.json validation failed:", error);
      throw error;
    }
  });

  test("Should validate built plugin exports", async () => {
    console.log("Validating built plugin exports...");

    try {
      const distPath = path.resolve("../dist");
      
      // Check that dist directory exists
      const distStats = await fs.stat(distPath);
      expect(distStats.isDirectory()).toBe(true);

      // Check for main files
      const indexPath = path.join(distPath, "index.js");
      const indexDtsPath = path.join(distPath, "index.d.ts");
      
      await fs.access(indexPath);
      await fs.access(indexDtsPath);

      // Check for action files
      const actionsPath = path.join(distPath, "actions");
      const actionsStats = await fs.stat(actionsPath);
      expect(actionsStats.isDirectory()).toBe(true);

      const actionFiles = await fs.readdir(actionsPath);
      expect(actionFiles.length).toBeGreaterThan(0);
      expect(actionFiles.some(f => f.includes("actionGetAccountBalance"))).toBe(true);
      expect(actionFiles.some(f => f.includes("actionGetTokenPrice"))).toBe(true);

      console.log("Available action files:", actionFiles);
      console.log("✅ Built plugin exports are valid!");
    } catch (error: any) {
      console.error("Built plugin validation failed:", error);
      throw error;
    }
  });

  test("Should validate environment configuration", async () => {
    console.log("Validating environment configuration...");

    try {
      // Check required environment variables
      expect(process.env.ANKR_API_KEY).toBeDefined();
      expect(process.env.GOOGLE_GENERATIVE_AI_API_KEY).toBeDefined();
      
      // Validate API key format (basic check)
      const ankrKey = process.env.ANKR_API_KEY;
      expect(ankrKey?.length).toBeGreaterThan(10);
      
      const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      expect(googleKey?.length).toBeGreaterThan(10);

      // Validate test wallet address format
      expect(TEST_WALLET_ADDRESS).toMatch(/^0x[a-fA-F0-9]{40}$/);

      console.log("Environment configuration:");
      console.log("- ANKR_API_KEY:", ankrKey ? "✓ Set" : "✗ Missing");
      console.log("- GOOGLE_GENERATIVE_AI_API_KEY:", googleKey ? "✓ Set" : "✗ Missing");
      console.log("- TEST_WALLET_ADDRESS:", TEST_WALLET_ADDRESS);

      console.log("✅ Environment configuration is valid!");
    } catch (error: any) {
      console.error("Environment validation failed:", error);
      throw error;
    }
  });

  test("Should validate TypeScript compilation", async () => {
    console.log("Validating TypeScript compilation...");

    const parentDir = path.resolve("..");
    
    return new Promise((resolve, reject) => {
      const tscProcess = spawn("pnpm", ["run", "typecheck"], {
        cwd: parentDir,
        stdio: ["pipe", "pipe", "pipe"],
        env: { ...process.env }
      });

      let stdout = "";
      let stderr = "";

      tscProcess.stdout?.on("data", (data) => {
        const output = data.toString();
        stdout += output;
        console.log(output);
      });

      tscProcess.stderr?.on("data", (data) => {
        const output = data.toString();
        stderr += output;
        console.error(output);
      });

      tscProcess.on("close", (code) => {
        console.log(`TypeScript check exited with code ${code}`);
        
        if (code === 0) {
          console.log("✅ TypeScript compilation successful!");
          resolve(code);
        } else {
          console.error("❌ TypeScript compilation failed with exit code:", code);
          reject(new Error(`TypeScript compilation failed with exit code ${code}`));
        }
      });

      tscProcess.on("error", (error) => {
        console.error("Failed to start TypeScript check:", error);
        reject(error);
      });
    });
  }, 30000);
});