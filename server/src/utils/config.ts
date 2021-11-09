import dotenv from "dotenv";
import fs from "fs";

interface Config {
  GOOGLE_APPLICATION_CREDENTIALS: string;
  PROJECT_ID: string;
}

const envConfig = dotenv.parse(fs.readFileSync(".env.local"));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

export default process.env as unknown as Config;
