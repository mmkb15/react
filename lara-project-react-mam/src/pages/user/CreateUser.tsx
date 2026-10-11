import { useEffect, useState } from "react";
import type { Role } from "../../interfaces/Role";
import { api } from "../../api";
import { defaultUser, errorUser, type User } from "../../interfaces/User";
export default function CreateUser() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<User>(defaultUser);
  const [errUser, setErrUser] = useState(errorUser);

  const getRole = ()=>{
    api.get('roles')
    .then(function(res){
    //   console.log(res.data.data);
      setRoles(res.data.data);
    })
    .catch(function(err){
      console.log(err);
    })
  }
  useEffect(() => {
      getRole();
  },[]);
  const handleSubmit = () => {
    // console.log(user);
    api.post('users', user)
    .then(function(res){
      console.log(res.data);
      if(res.data.success){
        alert(res.data.success);  
        setUser(defaultUser);
        setErrUser(errorUser);
      }
    })
    .catch(function(err){
      console.log(err.response.data.errors);
      if(err.response.status === 422){
        //   console.log(err.response.data.errors.email[0]);
        //   console.log(err.response.data.errors.password_confirmation[0]);
        setErrUser(err.response.data.errors);
      }
    })
  }
  return (
    <div className="w-1/2 mx-auto mt-4">
      <h1 className="text-center font-bold text-2xl text-green-800 mb-4">
        Add User
      </h1>
      <form>
        <label>Name</label>
        <input
          type="text"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <small className="text-red-500">{errUser.name ? errUser.name[0] : ''}</small>
        <br />
        <br />
        <label>Email</label>
        <input
          type="text"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <small className="text-red-500">{errUser.email ? errUser.email[0] : ''}</small>
        <br />
        <br />
        <label>Role</label>
        <select value={user.role_id} onChange={(e) => setUser({ ...user, role_id: Number(e.target.value) })} className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none">
          <option value="0" disabled>Select role...</option>
          {roles.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <small className="text-red-500">{errUser.role_id ? errUser.role_id[0] : ''}</small>
        <br />
        <br />
        <label>Password</label>
        <input
          type="password"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="******" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <small className="text-red-500">{errUser.password ? errUser.password[0] : ''}</small>
        <br />
        <br />
        <label>Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="******" value={user.password_confirmation} onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
        />
        <small className="text-red-500">{errUser.password_confirmation ? errUser.password_confirmation[0] : ''}</small>
        <br />
        <br />
        <div className="text-center">
          <button
            className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-4 hover:bg-emerald-800 focus:bg-emerald-600 duration-300"
            type="button" onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
