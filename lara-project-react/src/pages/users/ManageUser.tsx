import { useEffect, useState } from "react";
import { api } from "../../api";

import type { User } from "../../interfaces/User";
import { Link } from "react-router";

function ManageUser() {
    const [users, setUsers] = useState<User[]>([])

    function getAll(){
        api
        .get('/users')
        .then(function (res){
            // console.log("API Response:", res.data);
            // console.log("Is Array:", Array.isArray(res.data.users.data));
            
            setUsers(res.data.users.data);
        })
        .catch(function (err){
            console.log(err);
        });
    }
    useEffect(()=>{
        getAll();
    },[])
    
    const handleDelete = (id:number, name:string) => {
        let result = confirm(`Are you sure you want to delete ${name}?`);
        if(result){
            // alert(`Deleted ${name}`);
            api
                .delete(`users/${id}`)
                .then(function (res){
                    getAll();
                    alert(res.data.message);
                })
                .catch(function(err){
                    console.log(err);
                })

        } else {
            alert(`Not Deleted ${name}`);
        }
    }

    return ( 
        <>
            {/* <div className="w-max mx-auto my-10 ">
                <h2 className="text-center font-bold text-2xl text-green-800 mb-4">Users List</h2>
                <div className="flex justify-center w-full mb-4">
                    <Link
                        to="/users/create"
                        className="text-white bg-green-600 border border-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium leading-5 rounded-base text-sm px-6 py-2.5 focus:outline-none"
                    >
                        + Create
                    </Link>
                </div>

                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                            <tr className="">
                                <th scope="col" className="px-6 py-3 font-medium">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user)=>(
                            <tr className="bg-neutral-primary border-b border-default" key={user.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {user.id}
                                </th>
                                <td className="px-6 py-4">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/users/${user.id}`}
                                        className="text-blue-600 bg-neutral-primary border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-200 font-medium leading-5 rounded-base text-sm px-4 py-2.5 ml-2 focus:outline-none"
                                    >
                                        Show
                                    </Link>

                                    <button
                                        type="button"
                                        className="text-yellow-600 bg-neutral-primary border border-yellow-600 hover:bg-yellow-500 hover:text-white focus:ring-4 focus:ring-yellow-200 font-medium leading-5 rounded-base text-sm px-4 py-2.5 ml-2 focus:outline-none"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 bg-neutral-primary border border-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-200 font-medium leading-5 rounded-base text-sm px-4 py-2.5 ml-2 focus:outline-none"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        
                            ))}

                        </tbody>
                    </table>
                </div>

            </div> */}


            <div className="max-w-6xl mx-auto my-10 px-4">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="font-bold text-2xl text-gray-800">
                            Users List
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage all users from here
                        </p>
                    </div>

                    <Link
                        to="/users/create"
                        className="text-white bg-green-600 hover:bg-green-700
                        font-medium text-sm px-5 py-2.5 rounded-lg
                        shadow-sm transition duration-200
                        focus:outline-none focus:ring-4 focus:ring-green-200"
                    >
                        + Create
                    </Link>
                </div>

                {/* Table Card */}
                <div className="relative overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">

                    <table className="w-full text-sm text-left">

                        {/* Table Header */}
                        <thead className="text-sm text-gray-600 bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold">
                                    ID
                                </th>

                                <th scope="col" className="px-6 py-4 font-semibold">
                                    Name
                                </th>

                                <th scope="col" className="px-6 py-4 font-semibold">
                                    Role
                                </th>

                                <th scope="col" className="px-6 py-4 font-semibold">
                                    Email
                                </th>

                                <th scope="col" className="px-6 py-4 font-semibold text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    className="bg-white border-b border-gray-100
                                    hover:bg-gray-50 transition duration-150"
                                    key={user.id}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap"
                                    >
                                        #{user.id}
                                    </th>

                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {user.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium
                                        text-green-700 bg-green-100 rounded-full">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-2">

                                            <Link
                                                to={`/users/${user.id}`}
                                                className="text-blue-600 border border-blue-600
                                                hover:bg-blue-600 hover:text-white
                                                font-medium text-sm px-4 py-2 rounded-lg
                                                transition duration-200
                                                focus:outline-none focus:ring-4 focus:ring-blue-100"
                                            >
                                                Show
                                            </Link>

                                            <Link
                                                to={`/users/${user.id}/edit`}
                                                className="text-yellow-600 border border-yellow-500
                                                hover:bg-yellow-500 hover:text-white
                                                font-medium text-sm px-4 py-2 rounded-lg
                                                transition duration-200
                                                focus:outline-none focus:ring-4 focus:ring-yellow-100"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="text-red-600 border border-red-600
                                                hover:bg-red-600 hover:text-white
                                                font-medium text-sm px-4 py-2 rounded-lg
                                                transition duration-200
                                                focus:outline-none focus:ring-4 focus:ring-red-100"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>

        
        </>
     );
}

export default ManageUser;