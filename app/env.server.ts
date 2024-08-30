import { z } from "zod";

const requiredInProduction: z.RefinementEffect<
  string | undefined
>["refinement"] = (value, ctx) => {
  if (process.env.NODE_ENV === "production" && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Missing required environment variable " + ctx.path.join("."),
    });
  }
};

const requiredInDevelopment: z.RefinementEffect<
  string | undefined
>["refinement"] = (value, ctx) => {
  if (process.env.NODE_ENV === "development" && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Missing required environment variable " + ctx.path.join("."),
    });
  }
};

const envSchema = z.object({
  // Get from https://app.convertkit.com/account_settings/advanced_settings
  SENTRY_AUTH_TOKEN: z.string().optional().superRefine(requiredInProduction),

  // A token to increase the rate limiting from 60/hr to 1000/hr
  SENTRY_DSN: z.string().optional().superRefine(requiredInProduction),
  SENTRY_ORG: z.string().optional().superRefine(requiredInProduction),
  SENTRY_PROJECT: z.string().optional().superRefine(requiredInProduction),

  NODE_ENV: z.string(),
});

export const env = envSchema.parse(process.env);
