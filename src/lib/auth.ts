import { betterAuth, google } from "better-auth";
import { bearer, openAPI } from "better-auth/plugins";
import { Pool } from "@neondatabase/serverless";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },

    trustedOrigins: ["*"],
    plugins: [
        bearer(),
        openAPI(),
    ],
    session: {
        expiresIn: 60 * 60 * 24 * 30,
        updateAge: 60 * 60 * 24,
    },

});