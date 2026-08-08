import { Outlet } from "react-router";
import Footer from "./views/layout/Footer";
import Navbar from "./views/layout/Navbar";
import Sidebar from "./views/layout/Sidebar";

function App() {
  return (
    <>
      <div className="admin-shell">
        <Sidebar />
        <div className="admin-main">
          <Navbar />
            {/* <input type="checkbox" id="myInput" />
            <label htmlFor="myInput">Input Label</label> */}
          <Outlet />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
