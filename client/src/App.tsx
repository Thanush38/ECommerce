
import './App.css';
import Home from './components/Home/Home.tsx'
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
import ProductPage from './components/ProductPage/ProductPage.tsx'
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
