import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/generated/prisma";

export const auth = betterAuth({
  plugins: [nextCookies()],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user:{
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false
      }
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
  },

  emailAndPassword: {
    enabled: true,
  },
});
