import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

import { DATABASE_URL } from "../config/env.js";

/**
 * How does this code work:
 * - check if prisma is present in Global memory
 * - if it is present reuse
 * - if not present create
 * - We store in global when we run in dev mode (so reloads don't recreate connections)
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  const adapter = new PrismaPg({ connectionString: DATABASE_URL });
  return new PrismaClient({ adapter });
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
