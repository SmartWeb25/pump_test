import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import HerosList from 'Containers/Heros/HerosList';
import { RainbowThemeContainer } from 'react-rainbow-components';
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      return false; 
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:54633" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const theme = {
    rainbow: {
        palette: {
            brand: '#0094F3',
        },
    },
};


function App() {
  return (
    <ApolloProvider client={client}>
      <RainbowThemeContainer theme={theme}>
        <HerosList />
      </RainbowThemeContainer>
    </ApolloProvider>
  );
}

export default App;
