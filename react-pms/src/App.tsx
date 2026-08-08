import Footer from "./views/layout/Footer"
import Navbar from "./views/layout/Navbar"
import Sidebar from "./views/layout/Sidebar"
import Dashboard from "./views/pages/Dashboard"

function App() {

  return (
      <>
    {/* <!-- Layout wrapper --> */}
    <div className="layout-wrapper layout-content-navbar  ">
      <div className="layout-container">
        
        {/*  Menu */}
        <Sidebar />
        {/* /Menu  */}

        {/* Layout container --> */}
        <div className="layout-page">

          {/* <!-- Navbar --> */}
          <Navbar />
          {/* <!-- / Navbar --> */}

          {/* <!-- Content wrapper --> */}
          <div className="content-wrapper">
            {/* <!-- Content --> */}
            <Dashboard />
            {/* <!-- / Content --> */}

            {/* <!-- Footer --> */}
            <Footer />
            {/* <!-- / Footer --> */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* <!-- Content wrapper --> */}
        </div>
        {/* <!-- / Layout page --> */}
      </div>

      {/* <!-- Overlay --> */}
      <div className="layout-overlay layout-menu-toggle"></div>

      {/* <!-- Drag Target Area To SlideIn Menu On Small Screens --> */}
      <div className="drag-target"></div>
    </div>
    {/* <!-- / Layout wrapper --> */}
      
      </>
  )
}

export default App
