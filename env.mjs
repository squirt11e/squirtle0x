import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  client: {
    NEXT_PUBLIC_ALCHEMY_KEY: z.string(),
    NEXT_PUBLIC_ALCHEMY_OP_KEY: z.string(),
    NEXT_PUBLIC_GTAG: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    NEXT_PUBLIC_ALCHEMY_OP_KEY: process.env.NEXT_PUBLIC_ALCHEMY_OP_KEY,
    NEXT_PUBLIC_GTAG: process.env.NEXT_PUBLIC_GTAG,
  },
});