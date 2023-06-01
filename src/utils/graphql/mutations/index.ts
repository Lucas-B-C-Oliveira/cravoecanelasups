export function mutationCustomerCreate() {
  return `mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
      displayName
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`
}

export function mutationGetAuthenticationTokenByEmailAndPassword() {
  return `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`
}

export function mutationCreateCheckout() {
  return `
  mutation createCheckout($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      id
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
`
}

export function mutationCheckoutAssociate() {
  return `
mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
  checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
    checkout {
      id
      availableShippingRates {
				 shippingRates {
					 handle
					 price {
						 amount
						 currencyCode
					}
					 title
				}
			}
			shippingAddress {
				address1
				city
			  country
				firstName
				lastName
				phone
			 	province
			  zip
			}

    }
    checkoutUserErrors {
      code
    }
    customer {
      email
    }
  }
}
`
}

export function mutationCustomerUpdateFields() {
  return `
    mutation customerUpdate($input: CustomerInput!) {
      customerUpdate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
          metafields(first: 10) {
            edges {
              node {
                id
                namespace
                key
                value
              }
            }
          }
        }
      }
    }
  `
}

export function mutationCustomerUpdateAdresses() {
  return `
    mutation customerUpdate($input: CustomerInput!) {
      customerUpdate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          addresses{
            id
          }
          defaultAddress {
            id
          }
        }
      }
    }
  `
}

export function mutationCustomerAdressCreate() {
  return `
    mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
      customerAddressCreate(
        address: $address
        customerAccessToken: $customerAccessToken
      ) {
        customerAddress {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `
}
