import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api";
import { defaultUser, errorUser } from "../interfaces/User";

function Login() {
    const [user, setUser] = useState({
        email: "bugaguku@mailinator.com",
        password: "123456"
    });
    const [err, setErr]   = useState(errorUser);
    const [msg, setMsg]   = useState('');
    const navigate        = useNavigate();

    const handleSubmit = () => {
        // console.log (user);
        api.post('login', user)
            .then(function(res){
                // console.log(res.data);
                if(res.data.success){
                    alert(res.data.success);
                    setUser({
                        email: "bugaguku@mailinator.com",
                        password: "123456"
                    });
                    setErr(errorUser);
                    localStorage.setItem('lara_token', res.data.token);
                    navigate('/users');
                }
            })
            .catch(function(err){
                // console.log(err.response.data);
                if(err.response.status ===422) {
                    setErr(err.response.data.errors);
                }else if(err.response.status === 401){
                    setErr(errorUser);
                    console.log(err.response);
                    setMsg(err.response.data.message);
                }
            })
    };

    return (
        <>
            <div className="w-1/2 mx-auto mt-10">

                <h2 className="text-center font-bold text-2xl text-green-800 my-4">
                    Login
                </h2>

                <form>

                    {/* Email */}
                    {/* <label>Email</label>

                    <input
                        type="email"
                        className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br />
                    <br /> */}

                    {/* Password */}
                    {/* <label>Password</label>

                    <input
                        type="password"
                        className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />
                    <br /> */}


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
                    <div className="text-center">
                        <small className="text-red-500">{msg}</small>
                    </div>
                    <br />
                    {/* Button */}
                    <div className="text-center">

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-6 hover:bg-emerald-800 duration-300 mb-5"
                        >
                            Login
                        </button>

                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-emerald-600 font-semibold hover:underline"
                            >
                                Register
                            </Link>
                        </p>

                    </div>

                </form>

            </div>
        </>
    );
}

export default Login;