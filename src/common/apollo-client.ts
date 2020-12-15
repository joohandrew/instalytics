import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://graphqlzero.almansi.me/api' }),
  cache: new InMemoryCache()
});

export default client