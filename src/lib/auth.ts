/* eslint-disable @typescript-eslint/no-unused-vars */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import prisma from "./prisma";
import { Resend } from "resend";
import EmailTemplate from "@/components/common/email-template";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  plugins: [
    nextCookies(),
    admin()
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    cookiePrefix: "taberna-gute",
  },

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({user, url, token}, request) => {
      const { data, error } = await resend.emails.send({
        from: "Suporte <bounced@resend.dev>",
        to: "delivered+password-reset@resend.dev",
        subject: "Redefinição de senha",
        react: EmailTemplate({ name: user.name, url }),
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    modelName: "User",
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "client",
        input: false,
      },
    },
  },
  session: {
    modelName: "Session",
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  account: {
    modelName: "Account",
  },
  verification: {
    modelName: "Verification",
  },

  events: {
    async onUserCreated(
      user: { id: string },
      account: object,
      profile: { picture: string }
    ) {
      // profile contém os dados vindos do Google, incluindo picture
      await prisma.user.update({
        where: { id: user.id },
        data: {
          image: profile?.picture ?? " ",
        },
      });
    },
  },
});
