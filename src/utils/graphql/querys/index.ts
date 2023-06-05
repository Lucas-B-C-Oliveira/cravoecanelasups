export function queryCustomerWithId(id: string) {
  return `
  query GetCustomerInfo{
    customer(id: "${id}") {
      id
      firstName
      lastName
      email
      phone
    }
  }
  `
}

export function queryGetProducts(
  amountOfProducts: number = 1,
  amountOfProductsImages: number = 1,
) {
  return `query {
    products(first: ${amountOfProducts}) {
        nodes {
          id
          title
          handle
          description
          priceRangeV2{
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
          }
          images(first: ${amountOfProductsImages}){
            nodes {
              id
              url
            }
          }
        }
      }
   }
  `
}

export function queryGetProductByHandle(handle: string) {
  return `
    {
      product(handle: "${handle}") {
        id
        title
        description
        handle
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 40) {
          nodes {
            id
            price {
							amount
							currencyCode
						} 
          }
        }
        images(first: 10) {
          nodes {
            altText
            url
          }
        }
        featuredImage {
          url
          altText
        }
      }
    }
  `
}

const productNodesData = `
      nodes {
        id
        title
        handle
        description
        variants(first: 40) {
          nodes {
            id
            selectedOptions {
              name
              value
            }
          }
        }
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
      }
`

export function queryGetProductsByCollectionHandle(
  collectionHandle: string,
  firstProducts: number = 40,
) {
  return `
  {
    collection(handle: "${collectionHandle}") {
      products(first: ${firstProducts}) {
        ${productNodesData}
      }
    }
  }
  `
}

export function queryGetProductsByFilters(
  collectionHandle: string,
  firstProducts: number = 40,
  filters: any[],
) {
  const stringFilters = JSON.stringify(filters)

  const regex = /"([^"]+)"(?=:)/g
  const modifiedString = stringFilters.replace(regex, '$1')

  return `
{
  collection(handle: "${collectionHandle}") {
    products(first: ${firstProducts}, filters: ${modifiedString}) {
      ${productNodesData}
    }
  }
}
  `
}

export function queryGetEmailIfCustomerExistsByEmail(email: string) {
  return ` query {
    customers(first: 1, query: "${email}") {
      nodes {
        id
        email
      }
    }
  }
  `
}

export function queryGetCustomerAddressByToken(token: string) {
  return ` query {
      customer(customerAccessToken: "${token}") {
      id
      displayName
      email
      defaultAddress {
        zip
        name
        address1
        address2
        city
        id
        country
        phone
        provinceCode
        id
      }
      addresses(first: 10) {
          nodes {
            zip
            name
            address1
            address2
            city
            id
            country
            phone
            provinceCode
            id
          }
        }
      }
    }
  `
}

export function queryMetaObjectByType(type: string) {
  return `
  {
    metaobjectDefinitionByType(type: "${type}") {
      metaobjects(first: 1) {
        nodes {
          fields {
            key
            value
            references(first: 30) {
              nodes {
                ... on MediaImage {
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  } 
  `
}
