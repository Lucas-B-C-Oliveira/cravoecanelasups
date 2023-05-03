import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { env } from '@/utils/env'

const defaultRequestData: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token':
      env.SHOPIFY_APPLICATION_STOREFRONT_ACCESS_TOKEN,
  },
  cache: 'no-cache',
}

function defaultRequestDataWithCustomerToken(accessToken: string): RequestInit {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        env.SHOPIFY_APPLICATION_STOREFRONT_ACCESS_TOKEN,
      'X-Shopify-Customer-Access-Token': `${accessToken}`,
    },
    cache: 'no-cache',
  }
}

export async function customerQuery(query: string, accessToken: string) {
  const requestData = defaultRequestDataWithCustomerToken(accessToken)

  const result = await fetch(
    env.SHOPIFY_APPLICATION_PATH + env.SHOPIFY_STOREFRONT_GRAPHQL_API_PATH,
    {
      ...requestData,
      body: JSON.stringify({ query }),
    },
  )

  const jsonResult = await result.json()

  if (jsonResult.errors) {
    return new Error(jsonResult.errors[0].message)
  }

  return await new Promise((resolve) => {
    resolve(jsonResult.data)
  })
}

export async function query(query: string) {
  const result = await fetch(
    env.SHOPIFY_APPLICATION_PATH + env.SHOPIFY_STOREFRONT_GRAPHQL_API_PATH,
    {
      ...defaultRequestData,
      body: JSON.stringify({ query }),
    },
  )

  const jsonResult = await result.json()

  if (jsonResult.errors) {
    return new Error(jsonResult.errors[0].message)
  }

  return await new Promise((resolve) => {
    resolve(jsonResult.data)
  })
}

export async function customerMutation(
  query: string,
  variables: any,
  accessToken: string,
) {
  const requestData = defaultRequestDataWithCustomerToken(accessToken)

  const data = {
    query,
    variables,
  }

  const result = await fetch(
    env.SHOPIFY_APPLICATION_PATH + env.SHOPIFY_STOREFRONT_GRAPHQL_API_PATH,
    {
      ...requestData,
      body: JSON.stringify(data),
    },
  )

  const jsonResult = await result.json()

  if (jsonResult.errors) {
    return new Error(jsonResult.errors[0].message)
  }

  return await new Promise((resolve) => {
    resolve(jsonResult.data)
  })
}

export async function mutation(query: string, variables: any) {
  const data = {
    query,
    variables,
  }

  const result = await fetch(
    env.SHOPIFY_APPLICATION_PATH + env.SHOPIFY_STOREFRONT_GRAPHQL_API_PATH,
    {
      ...defaultRequestData,
      body: JSON.stringify(data),
    },
  )

  const jsonResult = await result.json()

  if (jsonResult.errors) {
    return new Error(jsonResult.errors[0].message)
  }

  return await new Promise((resolve) => {
    resolve(jsonResult.data)
  })
}
