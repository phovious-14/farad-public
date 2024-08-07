import { apolloClient } from './ApolloClient';
import { gql } from '@apollo/client'

export async function queryExample () {
  const response = await apolloClient.query({
   query: gql(`query MyQuery {
  accounts(where: {id: "0x36dcb6173777a17ce1e0910ec0d6f31a64b6b9c7"}) {
    isSuperApp
    inflows {
      currentFlowRate
      token {
        symbol
      }
      sender {
        id
      }
    }
    outflows {
      currentFlowRate
      token {
        symbol
      }
      receiver {
        id
      }
    }
    accountTokenSnapshots {
      token {
        id
      }
      totalNumberOfActiveStreams
      totalNetFlowRate
    }
  }
}`)
 })
 return (response.data)
}


export async function Balanceof(walletAddress) {
  const response = await apolloClient.query({
    query: gql(`query MyQuery {
  accounts(where: {id: "0x36b441f7cfe6bd01102e4b8f48b6172cdc21c69e"}) {
    accountTokenSnapshots {
      balanceUntilUpdatedAt
    }
  }
}`)
  })
  return (response.data.accounts[0].accountTokenSnapshots[0].balanceUntilUpdatedAt)
 
}