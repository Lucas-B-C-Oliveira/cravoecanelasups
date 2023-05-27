import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://cravo-e-canela-suplementos.myshopify.com/api/2023-01/',
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['X-Shopify-Storefront-Access-Token'] =
  '194855f8d4ed1ae92f6d70d11d167c43'

// export const api = axios.create({
//   baseURL:
//     'https://cravo-e-canela-suplementos.myshopify.com/api/2023-01/graphql.json',
// })
