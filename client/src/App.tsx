import './App.css';
import Home from './components/Home/Home.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductPage from './components/ProductPage/ProductPage.tsx'
import AboutUs from "./components/InfoPages/AboutUs/AboutUs.tsx";
import Error from "./components/Error/Error.tsx";
import Policy from "./components/InfoPages/Policy/Policy.tsx";
import Checkout from "./components/Checkout/Checkout.tsx";
import SingleProduct from "./components/SingleProduct/SingleProduct.tsx";
function App() {
  return (
      <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/products/:search" element={<ProductPage/>} />
        <Route path="/product/:id" element={<SingleProduct/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/checkout" element={<Checkout/>} />

        <Route path="*" element={<Error/>} />
    </Routes>
      </Router>
  );
}

export default App;
