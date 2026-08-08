import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import PageHeading from "../../../components/PageHeading.tsx";
import { type Post, defaultPost } from "../../../interfaces/Post";

function PostEdit() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>(defaultPost);
  const [msg, setMsg] = useState("");

  function getData() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      // axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(function (res) {
        // console.log(res.data);
        setPost(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  function handleSubmit() {
    // console.log(post);
    axios
      .put("https://jsonplaceholder.typicode.com/posts/" + id, post)
      .then(function (res) {
        // console.log(res.data)
        setPost(res.data);
        setMsg("🎉 Post updated successfully!");
        // location.href = "/post";
      })
      .catch(function (err) {
        console.log(err);
        setMsg("⚠️ Something went wrong. Post update failed!");
      });
  }
  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading subtitle="Management" title="Edit Post">
            <Link className="btn btn-outline-secondary btn-sm" to="/Post">
              <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to
              List
            </Link>
          </PageHeading>

          <section className="row g-3">
            <div className="col-12">
              {msg != "" && (
                <div className="alert alert-info" role="alert">
                  {msg}
                </div>
              )}
              <form className="panel needs-validation">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      type="text"
                      value={post.title}
                      onChange={(e) =>
                        setPost({ ...post, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Body</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      onChange={(e) =>
                        setPost({ ...post, body: e.target.value })
                      }
                      value={post.body}
                    ></textarea>
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                  <button className="btn btn-outline-secondary" type="reset">
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Update
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
export default PostEdit;
