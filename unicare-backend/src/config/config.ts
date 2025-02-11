// all configurations stem from here
import dotenv from "dotenv";
import { execSync } from "child_process";

const getGitBranch = (): string => {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch (error) {
    console.warn("Failed to get Git branch. Defaulting to 'development'.");
    return "development";
  }
};

const branch = getGitBranch();
const envFile = branch === "main" ? ".env.prod" : ".env";

dotenv.config({ path: envFile });
console.log(`Loaded environment configuration from ${envFile}`);

export const jwtConfig = {
  secret: process.env.JWT_SECRET as string,
  expiry: process.env.JWT_EXPIRY_HOUR as string,
  saltRound: 3,
};

export const emailConfig = {
  emailService: process.env.EMAIL_SERVICE,
  mailHost: process.env.MAIL_HOST,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASS,
  mailFrom: process.env.MAIL_FROM,
  mailPort: parseInt(process.env.MAIL_PORT as string, 10) || 465,
};

export const frontendConfig = {
  frontendUrl: process.env.FRONTEND_BASE_URL || "http://localhost:3000",
};

export const dbConfig = {
  databaseUrl: process.env.DATABASE_URI as string,
};
