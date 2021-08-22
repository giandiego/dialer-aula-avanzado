import { config } from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = config();
dotenvExpand(myEnv);

export default {
  mongodbURL: process.env.MONGODB_URI || "mongodb://localhost/apiBaseTest",
  domain: process.env.DOMAIN || "http://localhost",
  ssl: process.env.SSL || false,
  key: process.env.KEY || "",
  cert: process.env.CERT || "http://localhost",
  port: process.env.PORT || 4000,
  amiHost: process.env.AMI_HOST || localhost,
  amiUser: process.env.AMI_USER || monitor,
  amiPass: process.env.AMI_PASS || passmonitor,
  amiPort: process.env.AMI_PORT || 5038,
};