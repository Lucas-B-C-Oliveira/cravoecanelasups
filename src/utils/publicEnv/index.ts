import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_APPLICATION_PATH: z.string(),
  NEXT_PUBLIC_APPLICATION_API_PATH: z.string(),
  NEXT_PUBLIC_SHOPIFY_APPLICATION_PATH: z.string(),
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_API_PATH: z.string(),
  NEXT_PUBLIC_SHOPIFY_ADMIN_GRAPHQL_API_PATH: z.string(),
})
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
