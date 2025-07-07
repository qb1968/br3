
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Categories from "./pages/Categories";
import About from "./pages/About";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import "./index.css";
import CategoryProducts from "./pages/CategoryProducts";
import Footer from "./components/Footer";
import Contact from "./pages/Contact"
import Products from "./pages/Products";
import Navbar from "./components/Navbar"
const App = () => {
  return (
    <div>
      <Navbar />
    <Routes>
       
      <Route path="/" element={<Home />}/>
        {/* <Route index element={<Home />} /> */}
        <Route path="categories" element={<Categories />} /> 
        <Route path="about" element={<About />} />
        <Route path="admin" element={<Admin />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products/>}/>
      
      </Routes>
      
    <Footer/>
    </div>
  
   
    
   ); 
}
  
export default App