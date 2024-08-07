import { ApolloClient, InMemoryCache } from '@apollo/client'

// const APIURL = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-dev-eth-sepolia';
const APIURL = "https://subgraph-endpoints.superfluid.dev/eth-sepolia/protocol-v1"

export const apolloClient= new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache()
})