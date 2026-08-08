import { Link } from "react-router";
import Img404 from "../../assets/img/404.svg";
function NotFound() {
  return (
    <>
      <main className="error-page">
        <section className="error-card">
          <Link className="auth-brand justify-content-center" to="/">
            <span className="brand-icon">
              <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i>
            </span>
            <span>
              <strong>StockMgt.</strong>
              <small>Error Center</small>
            </span>
          </Link>
          <img
            className="error-illustration"
            src={Img404}
            alt="Page not found illustration"
          />
          <div className="error-code">404</div>
          <h1 className="h3 mb-2">Page Not Found</h1>
          <p className="text-muted mb-4">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Link className="btn btn-primary" to="/">
              <i className="bi bi-speedometer2" aria-hidden="true"></i> Back to
              Dashboard
            </Link>
            <Link className="btn btn-outline-secondary" to="/login">
              Sign In
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
export default NotFound;
