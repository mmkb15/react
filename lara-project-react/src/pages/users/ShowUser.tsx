import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../api";
import { defaultUser } from "../../interfaces/User";


function ShowUser() {
    const {id} = useParams();
    const [user, setUser]   = useState(defaultUser);
    const getItem = () => {
        api
            .get(`users/${id}`)
            .then(function (res) {
                console.log(res.data.user);
                setUser(res.data.user);
            })
            .catch(function(err){
                console.log(err);
            })
    };
    useEffect(() => {
        getItem();
    }, []);
    return ( 
        <>
            {/* <div className="w-1/2 mx-auto mt-0">
                <h2 className="text-center font-bold text-2xl text-green-800 my-4">
                 User Details {id}
                </h2>

                <div className="mb-3 pb-3 border-b border-b-blue-200"><b className="me-2">ID: </b> {user.id}</div>
                <div className="mb-3 pb-3 border-b border-b-blue-200"><b className="me-2">NAME: </b> {user.name}</div>
                <div className="mb-3 pb-3 border-b border-b-blue-200"><b className="me-2">E-MAIL: </b> {user.email}</div>
                <div className="mb-3 pb-3 border-b border-b-blue-200"><b className="me-2">ROLE: </b> {user.role}</div>

            </div> */}



            <div className="w-1/2 mx-auto my-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-3xl font-bold text-green-700">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <h2 className="font-bold text-2xl text-gray-800">
                        User Details
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        User ID: #{id}
                    </p>
                </div>

                {/* User Information Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                    <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-500">
                            ID
                        </span>
                        <span className="font-semibold text-gray-800">
                            #{user.id}
                        </span>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-500">
                            Name
                        </span>
                        <span className="font-semibold text-gray-800">
                            {user.name}
                        </span>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-500">
                            E-mail
                        </span>
                        <span className="font-semibold text-gray-800">
                            {user.email}
                        </span>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                            Role
                        </span>

                        <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                            {user.role}
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ShowUser;