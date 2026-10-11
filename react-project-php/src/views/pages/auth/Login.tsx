import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../../config";
function Login() {
  const [user, setUser] = useState({email: "nomail@gmail.com", password: "123"});
  const [msg, setMsg]   = useState("");
  const navigate = useNavigate();

  // function handleSubmit() {};
  // const handleSubmit = () => {}; //function expression
  const handleSubmit = function() {
    // console.log(user); 
    api.post("login", user)
    .then((res) => {
      console.log(res.data.token);
      localStorage.setItem("bearer_token", res.data.token);
      setMsg("");
      // window.location.href = "/";
      navigate("/");
    })
    .catch((err) => {
      console.log(err.response.data);
      if(err.response.status == 401) setMsg(err.response.data);
      else setMsg ("⚠️ Something wet wrong. Login Failed!")
    })
  };

  return (
    <>
      <main className="auth-page">
        <section className="auth-card">
          <Link className="auth-brand" to="/">
            <span className="brand-icon">
              <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i>
            </span>
            <span>
              <strong>StockMgt.</strong>
              <small>Sign in to your admin workspace.</small>
            </span>
          </Link>
          <form className="needs-validation">
            <div className="mb-4">
              <p className="eyebrow mb-1">Secure Access</p>
              <h1 className="h3 mb-1">Login</h1>
              <p className="text-muted mb-0">
                Sign in to your admin workspace.
              </p>

              {/* Error Msg */}
              <div className="pt-2 text-center">
                <div className="badge border  border-danger text-danger py-2 px-3">{msg}</div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="loginEmail">
                Email address
              </label>
              <input
                className="form-control"
                id="loginEmail"
                type="email"
                required
                value={user.email}
                onChange={(e)=> setUser({...user, email: e.target.value})}
              />
              <div className="invalid-feedback">Enter a valid email.</div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
                <a className="small fw-semibold" href="forgot-password.html">
                  Forgot?
                </a>
              </div>
              <input
                className="form-control"
                id="loginPassword"
                type="password"
                minLength={6}
                required
                value={user.password}
                onChange={(e)=> setUser({...user, password: e.target.value})}
              />
              <div className="invalid-feedback">
                Password must be at least 6 characters.
              </div>
            </div>
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button
             type="button" 
             className="btn btn-primary w-100"
             onClick={handleSubmit}
             >
              <i className="bi bi-box-arrow-in-right me-2" aria-hidden="true"></i>
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            New here? <a href="register.html">Create an account</a>
          </div>
        </section>
      </main>
    </>
  );
}
export default Login;
