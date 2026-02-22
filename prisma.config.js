import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  engine: "binary",          
  datasource: {
    url: env("DATABASE_URL"), 
  },
});
