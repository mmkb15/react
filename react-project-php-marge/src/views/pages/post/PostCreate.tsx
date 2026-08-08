import { Link } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading.tsx";
import { defaultPost } from "../../../interfaces/Post.ts";
import type { Post } from "../../../interfaces/Post.ts";
import axios from "axios";

function PostCreate() {
  const [post, setPost] = useState<Post>(defaultPost);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState({
    title: "",
    body: "",
  });

  function handleSubmit() {
    let newError: any = {};
    // Title validation
      if (post.title == "") {
        newError.title = "Title is required";
      } else if (post.title.length > 100 || post.title.length < 3) {
        newError.title = "Title must be between 3 and 100 characters";
      } else {
        newError.title = "";
      }

    // Name validation
      if (post.body == "") {
        newError.body = "body is required";
      } else {
        newError.body = "";
      }
      setError(newError);

   
    axios
    .post(`https://jsonplaceholder.typicode.com/posts/`, post)
    .then(function (res) {
      console.log(res.data);
      setPost(res.data);
      setMsg("🚀 Post Created Successfully");
    })
    .catch(function(err){
      setMsg("🛑 Post Failed to Create");
    });
    
  }
  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading
            icon="person-plus"
            subtitle="Management"
            title="Add Post"
          >
            <Link className="btn btn-outline-secondary btn-sm" to="/Post">
              <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to
              List
            </Link>
          </PageHeading>

          <section className="row g-3">
            <div className="col-12">
              {/* Alert */}
              {msg !== "" && (
                <div className="alert alert-success" role="alert">
                 {msg}
                </div>
              )}
              <form className="panel needs-validation">
                <input
                      type="hidden"
                      value={post.userId}
                    />
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Title
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={post.title}
                      onChange={(e)=>setPost({...post,title:e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Body
                    </label>
                    <textarea className="form-control" onChange={(e)=>setPost({...post,body:e.target.value})}>{post.body}</textarea>
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
export default PostCreate;
