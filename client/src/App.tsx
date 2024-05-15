import './App.css';
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductPage from './components/ProductPage/ProductPage'
import AboutUs from "./components/InfoPages/AboutUs/AboutUs";
import Error from "./components/Error/Error";
import Policy from "./components/InfoPages/Policy/Policy";
function App() {
  return (
      <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/products/:search" element={<ProductPage/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="*" element={<Error/>} />
    </Routes>
      </Router>
  );
}

export default App;
