import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url(),
    VITE_TEST_SLOW_API: z.coerce.boolean().default(false), // <-- env variables are always strings so we must convert to boolean.
    VITE_STRIPE_PUBLISHABLE_KEY: z.string(),
  },
  isServer: false,
  runtimeEnv: import.meta.env,
})
