export function mutationCustomerCreate() {
  return `mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
        email
        phone
        taxExempt
        firstName
        lastName
        smsMarketingConsent {
          marketingState
          marketingOptInLevel
        }
        addresses {
          address1
          city
          country
          phone
          zip
        }
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
