import React from "react";
import Navbar from "./Components/Navbar"; // Importing Navbar component
import { Route, Router, Routes, useLocation } from "react-router-dom"; // Importing routing tools
import Home from "./Pages/Home"; // Importing Home page
import { Toaster } from "react-hot-toast"; // Importing Toaster for showing toast notifications
import Footer from "./Components/Footer";
import { useAppContext } from "./Context/AppContext";
import Login from "./Components/Login";
import AllProducts from "./Pages/AllProducts";
import ProductCategory from "./Pages/ProductCategory";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import MyOrders from "./Pages/MyOrders";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserlogin } = useAppContext();
  // Checking if the current URL path includes "seller"
  // If yes, we will hide the Navbar

  return (
    <div>
      {/* If not on a seller page, show the Navbar */}
      {isSellerPath ? null : <Navbar />}
      {showUserlogin ? <Login /> : null}

      {/* Toast notification container */}
      <Toaster />

      {/* Main Content Wrapper */}
      <div
        className={`${isSellerPath
            ? "" // If on seller page, no extra padding
            : "px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1320px] mx-auto"
          // Else add padding and center the page content
          }`}
      >
        {/* Routing Setup */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App; // Exporting App component
