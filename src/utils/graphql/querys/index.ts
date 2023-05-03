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

export function queryGetProductsByCollectionHandle(
  collectionHandle: string,
  firstProducts: number = 40,
) {
  return `
{
  collection(handle: "${collectionHandle}") {
    products(first: ${firstProducts}) {
      nodes {
        id
        title
        handle
        variants(first: ${firstProducts}) {
          nodes {
            id
            price {
							amount
							currencyCode
						}
          }
        }
        description
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
        firstName
        lastName
        email
        defaultAddress {
          firstName
          lastName
          address1
          address2
          city
          province
          zip
          country
          phone
        }
      }
    }
  `
}
