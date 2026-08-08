import { Link } from "react-router"

function Footer() {
    return(
        <>
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div
                  className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                  <div className="text-body">
                    &#169;
                    {/* <script>
                      document.write(new Date().getFullYear());
                    </script> */}
                    , made with ❤️ by <Link to="https://pixinvent.com" target="_blank" className="footer-link">Pixinvent</Link>
                  </div>
                  <div className="d-none d-lg-inline-block">
                    <Link to="https://themeforest.net/licenses/standard" className="footer-link me-4" target="_blank"
                      >License</Link>
                    <Link to="https://themeforest.net/user/pixinvent/portfolio" target="_blank" className="footer-link me-4"
                      >More Themes</Link>

                    <Link
                      to="https://demos.pixinvent.com/vuexy-html-admin-template/documentation/"
                      target="_blank"
                      className="footer-link me-4"
                      >Documentation</Link>

                    <Link to="https://pixinvent.ticksy.com/" target="_blank" className="footer-link d-none d-sm-inline-block"
                      >Support</Link>
                  </div>
                </div>
              </div>
            </footer>
        </>
    )
}
export default Footer