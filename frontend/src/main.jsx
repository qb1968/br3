import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import "./index.css";
import CategoryProducts from "./pages/CategoryProducts";
import Footer from "./components/Footer";
import Contact from "./pages/Contact"
import Products from "./pages/Products";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} /> 
        <Route path="about" element={<About />} />
        <Route path="admin" element={<Admin />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products/>}/>
      </Route>
    </Routes>
    <Footer/>
  </BrowserRouter>
);
