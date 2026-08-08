import { useEffect, useState } from "react";
import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading.tsx";
import axios from "axios";
import type { Post } from "../../../interfaces/Post.ts";

function PostManage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [msg, setMsg] = useState("");
  function getAllData() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (res) {
        // console.log(res.data);
        setPosts(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllData();
  }, []);

  function handleDelete(id: number | undefined) {
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + id)
      .then(function (res) {
        console.log(res);
        if(res.status == 200) setMsg("🎉 Post deleted successfully!");
        getAllData();
      })
      .catch(function (err) {
        console.log(err);
        setMsg("⚠️ Something went wrong. Post delete failed!");
      });

  }

  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading subtitle="Management" title="Posts">
            <Link to="/Post-create" className="btn btn-primary">
              <i className="bi bi-plus-lg me-1"></i> Add New
            </Link>
          </PageHeading>

          <section className="panel mt-3">
            {msg != "" && (
                <div className="alert alert-info" role="alert">
                  {msg}
                </div>
              )}
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                id="PostsTable"
                data-searchable-table=""
              >
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Title</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            className="avatar-img avatar-sm"
                            src="https://i.pravatar.cc/50"
                            alt="Sarah Ahmed"
                          />
                          <div>
                            {item.userId}
                          </div>
                        </div>
                      </td>
                      <td>{item.title}</td>
                      <td>
                        <div className="d-flex gap-1 justify-content-end">
                          <Link
                            to={`/Post-details/${item.id}`}
                            className="btn btn-sm btn-outline-success"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to="/Post-edit/1"
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button onClick={()=>handleDelete(item.id)} type="button" className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>                   
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default PostManage;
