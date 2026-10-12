
import { useNavigate } from "react-router";

export default function AccessDenied() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg sm:p-10">

                {/* Lock Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.7}
                        aria-hidden="true"
                    >
                        <rect x="4" y="10" width="16" height="11" rx="2" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 10V7a4 4 0 118 0v3"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 14v3"
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                    Error 403
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Access Denied
                </h1>

                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-emerald-600" />

                <p className="mt-5 text-base leading-7 text-gray-600">
                    Sorry, you don't have permission to access this page.
                    Please log in with an authorized account or request access
                    from your administrator.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition duration-200 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Go Back
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                    >
                        Login
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>

                </div>

                <p className="mt-8 text-sm text-gray-500">
                    Need access? Please contact your administrator.
                </p>

                <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="text-xs font-medium tracking-wider text-gray-400">
                        ERROR 403
                        <span className="mx-2 text-red-500">•</span>
                        <span className="text-emerald-700">PERMISSION REQUIRED</span>
                    </p>
                </div>

            </div>
        </div>
    );
}
