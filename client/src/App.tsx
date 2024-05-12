import './App.css';
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductPage from './components/ProductPage/ProductPage'
function App() {
  return (
      <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductPage/>} />
    </Routes>
      </Router>
  );
}

export default App;
