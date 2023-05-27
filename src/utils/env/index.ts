import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_APPLICATION_PATH: z.string(),
  NEXT_PUBLIC_APPLICATION_API_PATH: z.string(),
  NEXT_PUBLIC_SHOPIFY_APPLICATION_PATH: z.string(),
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_API_PATH: z.string(),
  SHOPIFY_APPLICATION_STOREFRONT_ACCESS_TOKEN: z.string(),
  NEXT_PUBLIC_SHOPIFY_ADMIN_GRAPHQL_API_PATH: z.string(),
  SHOPIFY_APPLICATION_ADMIN_ACCESS_TOKEN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = {
  public: {
    APPLICATION_PATH: _env.data.NEXT_PUBLIC_APPLICATION_PATH,
    APPLICATION_API_PATH: _env.data.NEXT_PUBLIC_APPLICATION_API_PATH,
    SHOPIFY_APPLICATION_PATH: _env.data.NEXT_PUBLIC_SHOPIFY_APPLICATION_PATH,
    SHOPIFY_STOREFRONT_GRAPHQL_API_PATH:
      _env.data.NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_API_PATH,
    SHOPIFY_ADMIN_GRAPHQL_API_PATH:
      _env.data.NEXT_PUBLIC_SHOPIFY_ADMIN_GRAPHQL_API_PATH,
  },
  private: {
    SHOPIFY_APPLICATION_STOREFRONT_ACCESS_TOKEN:
      _env.data.SHOPIFY_APPLICATION_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_APPLICATION_ADMIN_ACCESS_TOKEN:
      _env.data.SHOPIFY_APPLICATION_ADMIN_ACCESS_TOKEN,
  },
}
