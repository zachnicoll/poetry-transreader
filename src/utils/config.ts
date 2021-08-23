import dotenv from "dotenv";

interface Config {
  PORT: string;
  GOOGLE_APPLICATION_CREDENTIALS: string;
  PROJECT_ID: string;
}

if (dotenv.config().error)
  throw new Error("FAILED TO PASS PROJECT CONFIG, IS THE .env FILE CORRECT?");

export default dotenv.config().parsed as unknown as Config;
