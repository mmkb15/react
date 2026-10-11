import { Outlet, useNavigate } from "react-router";
import Footer from "./views/layout/Footer";
import Navbar from "./views/layout/Navbar";
import Sidebar from "./views/layout/Sidebar";
import { useEffect } from "react";
// import { checkToken } from "./utils/auth";

function App() {
  const navigate = useNavigate();
  // checkToken();
  const checkLogin = () => {
    if(!localStorage.getItem("bearer_token")) {
      navigate("/login", {replace: true});
    }
  };
  useEffect(() => {
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return() => {
      window.removeEventListener("storage", checkLogin);
    }
  }, [navigate]);
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
