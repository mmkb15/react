import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { defaultUser, errorUser } from "../interfaces/User";
import { api } from "../api";

function Register() {
    const [user, setUser] = useState(defaultUser);
    const [err, setErr]   = useState(errorUser);
    const navigate = useNavigate();

    const handleSubmit = () => {
        // console.log (user);
        api.post('register', user)
            .then(function(res){
                // console.log(res.data);
                if(res.data.success){
                    alert(res.data.success);
                    setUser(defaultUser);
                    setErr(errorUser);
                    navigate('/login');
                }
            })
            .catch(function(err){
                // console.log(err.response.data);
                if(err.response.status ===422) {
                    setErr(err.response.data.errors);
                }
            })
    };

    return (
        <>
            <div className="w-1/2 mx-auto mt-10">

                <h2 className="text-center font-bold text-2xl text-green-800 my-4">
                    Register
                </h2>

                <form>

                    {/* Name */}
                    <label>Name</label>

                    <input
                        type="text"
                        className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                    <small className="text-red-500">{err.name}</small>
                    <br />
                    <br />

                    {/* Email */}
                    <label>Email</label>

                    <input
                        type="email"
                        className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    <small className="text-red-500">{err.email}</small>
                    <br />
                    <br />
                    {/* Password */}
                    <label>Password</label>

                    <input
                        type="password"
                        className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                        placeholder="******"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                    <small className="text-red-500">{err.password}</small>
                    <br />
                    <br />

                    {/* Confirm Password */}
                    <label>Confirm Password</label>

                    <input
                        type="password"
                        className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                        placeholder="******"
                        value={user.password_confirmation}
                        onChange={(e) => setUser({...user, password_confirmation: e.target.value})}
                    />
                    <small className="text-red-500">{err.password_confirmation}</small>
                    <br />
                    <br />

                    {/* Button */}
                    <div className="text-center">

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-6 hover:bg-emerald-800 duration-300 mb-5"
                        >
                            Register
                        </button>

                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-emerald-600 font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </div>

                </form>

            </div>
        </>
    );
}

export default Register;