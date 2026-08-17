import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading.tsx";
import { defaultUser } from "../../../interfaces/User.ts";
import type { User } from "../../../interfaces/User.ts";
// import axios from "axios";
import type { Role } from "../../../interfaces/Role.ts";
import { api /*, baseApiUrl */ } from "../../../config.tsx";

function UserEdit() {
  const { id } = useParams();
  const [user, setUser] = useState<User>(defaultUser);
  const[roles, setRoles] = useState<Role[]>([])
  const [msg, setMsg] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  const getUser = () => {
    api
      .get("users-details?id="+id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getUser();
  },[])

  function getRoles(){
    api
    .get("roles")
    .then((res) => {
      console.log(res.data);
      setRoles(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getRoles();
  }, [])

  function handleSubmit(){
    let newErrors: any = {};
    if(user.name == ""){
      newErrors.name = "Name is required";
    }else if(user.name.length > 100 || user.name.length < 3){
      newErrors.name = "Name must be between 3 and 100 characters";
    }else{
      newErrors.name = "";
    }
    if(user.email == ""){
      newErrors.email = "Email is required";
    }else{
      newErrors.email = "";
    }

    if(user.role_id == 0){
      newErrors.role_id = "Role is required. Please select one";
    }else{
      newErrors.role_id = "";
    }
    setErrors(newErrors);

    if(newErrors.name == "" && newErrors.email == "" && newErrors.role_id == ""){
      // alert("Submited");
      // console.log(user);

      api
      .put("users-update", user)
      .then(res=>{
        console.log(res);
        if(res.status == 200){
            // setMsg(true);
            setMsg("success");
            // setUser(defaultUser);
        }
      })
      .catch(err=>{
        console.log(err);
        setMsg("error");
      })

    }
  }

  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading
            icon="person-gear"
            subtitle="Management"
            title="Edit User"
          >
            <Link className="btn btn-outline-secondary btn-sm" to="/user">
              <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to
              List
            </Link>
          </PageHeading>

          <section className="row g-3">
            <div className="col-12">

                {msg && (
                    <div
                        className={`alert ${
                            msg === "success" ? "alert-success" : "alert-danger"
                        } alert-dismissible fade show mb-3`}
                        role="alert"
                    >
                        {msg === "success"
                            ? "Data Update successfully."
                            : "Something went wrong!"
                        }

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setMsg(null)}
                        />
                    </div>
                )}



              <form className="panel needs-validation">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="firstName">
                      Name
                    </label>
                    <input
                      className="form-control"
                      id="firstName"
                      type="text"
                      value={user.name}
                      onChange={(e)=>setUser({...user,name:e.target.value})}
                    />
                    <small className="text-danger">{errors.name}</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e)=>setUser({...user,email:e.target.value})}
                    />
                    <small className="text-danger">{errors.email}</small>
                  </div>
                  <div className="col-md-6 offset-md-3 mt-4">
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                    <select className="form-select" id="role" value={user.role_id} 
                    onChange={(e)=>setUser({...user,role_id: Number(e.target.value)})}>
                      <option value={0} disabled>
                        Choose role...
                      </option>

                      {
                        roles.map(item=>(
                          <option key={item.id} value={item.id} >
                            {item.name}
                          </option>
                        ))
                      }



                    </select>
                    <small className="text-danger">{errors.role_id}</small>
                  </div>
                  {/* <div className="col-md-6">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      value={user.password}
                      onChange={(e)=>setUser({...user,password:e.target.value})}
                    />
                    <small className="text-danger">{errors.password}</small>
                  </div> */}
                </div>
                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                  <button className="btn btn-outline-secondary" type="reset">
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default UserEdit;
