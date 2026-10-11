import { useState } from 'react';
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'



function App() {
  
  return (
    <>

      <Nav />
      <hr />
      <div className="container mx-auto">
      <Outlet />
      </div>
      <hr />
      <Footer />



    </>
  )
}
import { Outlet } from 'react-router';
import Footer from './layouts/Footer';
import Nav from './layouts/Nav';
export default App
