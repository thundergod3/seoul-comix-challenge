/* eslint-disable @typescript-eslint/no-var-requires */
const { z } = require('zod');

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(
    '❌ Invalid environment variables: ' +
      JSON.stringify(env.error.format(), null, 4),
  );
}
module.exports.env = env.data;
