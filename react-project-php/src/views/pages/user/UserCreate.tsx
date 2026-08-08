import { Link } from "react-router";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading.tsx";
import { defaultUser } from "../../../interfaces/User.ts";
import type { User } from "../../../interfaces/User.ts";

function UserCreate() {
  const [user, setUser] = useState<User>(defaultUser);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });
  // let name = "Mina";
  // name = "Raju";
  // name = "Mithu";
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
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
  }

  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading
            icon="person-plus"
            subtitle="Management"
            title="Add User"
          >
            <Link className="btn btn-outline-secondary btn-sm" to="/user">
              <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to
              List
            </Link>
          </PageHeading>

          <section className="row g-3">
            <div className="col-12">
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
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                    <select className="form-select" id="role" value={user.role_id} 
                    onChange={(e)=>setUser({...user,role_id: Number(e.target.value)})}>
                      <option value={0} disabled>Choose role...</option>
                      <option value={1}>Admin</option>
                      <option value={2}>Manager</option>
                      <option value={3}>Editor</option>
                      <option value={4}>Viewer</option>
                    </select>
                    <small className="text-danger">{errors.role_id}</small>
                  </div>
                  <div className="col-md-6">
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
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                  <button className="btn btn-outline-secondary" type="reset">
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                    Create New
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
export default UserCreate;
