import { Link } from "react-router"

function NotFound(){
    return(
        <>
            {/* <!-- Error --> */}
            <div className="container-xxl container-p-y">
            <div className="misc-wrapper">
                <h1 className="mb-2 mx-2" style={{lineHeight: "6rem", fontSize: "6rem"}}>404</h1>
                <h4 className="mb-2 mx-2">Page Not Found️ ⚠️</h4>
                <p className="mb-6 mx-2">we couldn't find the page you are looking for</p>
                <Link to="/" className="btn btn-primary mb-10">Back to home</Link>
                <div className="mt-4">
                <img
                    src="../../assets/img/illustrations/page-misc-error.png"
                    alt="page-misc-error-light" 
                    width="225"
                    className="img-fluid" />
                </div>
            </div>
            </div>
            <div className="container-fluid misc-bg-wrapper">
            <img
                src="../../assets/img/illustrations/bg-shape-image-light.png"
                height="355"
                alt="page-misc-error"
                data-app-light-img="illustrations/bg-shape-image-light.png"
                data-app-dark-img="illustrations/bg-shape-image-dark.png" />
            </div>
            {/* <!-- /Error --> */}
        </>
    )
}
export default NotFound