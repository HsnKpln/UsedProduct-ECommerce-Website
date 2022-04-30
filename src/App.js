
import './App.css';
import { ProductProvider } from './contexts/ProductContext';
import { UserProvider } from './contexts/UserContext';
import Router from './root/router';

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <Router />
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
