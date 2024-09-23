import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import  Header  from './Header';
import  Menu  from './Menu';
import  Footer  from './Footer';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache(),
});

function App() {
  return <div>
    <ApolloProvider client={client}>
      <Header />
      <Menu />
      <Footer />
    </ApolloProvider>

  </div>
}

export default App;
