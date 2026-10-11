import { useState } from "react";
import "./App.css";
import Navbar from "./layouts/Nav";
import Footer from "./layouts/Footer";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
