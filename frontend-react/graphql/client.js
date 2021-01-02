import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});
