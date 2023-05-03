import { z } from 'zod'

const envSchema = z.object({
  APPLICATION_PATH: z.string(),
  APPLICATION_API_PATH: z.string(),
  SHOPIFY_APPLICATION_PATH: z.string(),
  SHOPIFY_STOREFRONT_GRAPHQL_API_PATH: z.string(),
  SHOPIFY_APPLICATION_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_ADMIN_GRAPHQL_API_PATH: z.string(),
  SHOPIFY_APPLICATION_ADMIN_ACCESS_TOKEN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
