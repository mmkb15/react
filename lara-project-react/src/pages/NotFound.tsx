
import { Link } from "react-router";

function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center max-w-lg">

                {/* Error Code */}
                <div className="text-emerald-600 text-8xl font-extrabold mb-4">
                    404
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Oops! The page you're looking for doesn't exist,
                    may have been moved, or the URL is incorrect.
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3 flex-wrap">

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-6 py-3
                        bg-emerald-600 text-white font-medium rounded-lg
                        hover:bg-emerald-700 transition duration-200 shadow-sm"
                    >
                        Back to Home
                    </Link>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-6 py-3
                        border border-gray-300 text-gray-700 font-medium rounded-lg
                        hover:bg-gray-100 transition duration-200"
                    >
                        Go Back
                    </button>

                </div>

            </div>
        </div>
    );
}

export default NotFound;
