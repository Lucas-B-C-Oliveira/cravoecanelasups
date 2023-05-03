import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { env } from '../env'

const defaultRequestData: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': env.SHOPIFY_APPLICATION_ADMIN_ACCESS_TOKEN,
  },
  cache: 'no-cache',
}

export async function queryAdmin(query: string) {
  const result = await fetch(
    `${env.SHOPIFY_APPLICATION_PATH}${env.SHOPIFY_ADMIN_GRAPHQL_API_PATH}`,
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

export async function mutationAdmin(query: string, variables: any) {
  const data = {
    query,
    variables,
  }

  const result = await fetch(
    `${env.SHOPIFY_APPLICATION_PATH}${env.SHOPIFY_ADMIN_GRAPHQL_API_PATH}`,
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
