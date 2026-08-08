import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import PageHeading from "../../../components/PageHeading.tsx";
import {type Post, defaultPost } from "../../../interfaces/Post";

function PostDetails() {
    const {id} = useParams();
    const [post, setPost] = useState<Post>(defaultPost);
    const [user, setUser] = useState({
      id: 0,
      name : "",
      username : "",
      email : "",
      phone : "", 
      website : "", 
      address: {
        city: "",
        zipcode: "",
        suite: "",
        street: "",
        geo : {
          lat : "",
          lng : "",
        }
      },
      company: {
        name : "",
      }
    })
    const [comments, setComments] = useState([
      {
        id: 0,
        email: "",
        body : "",
      }
    ])
 
    function getData() {
      axios
      .get("https://jsonplaceholder.typicode.com/posts/"+id)
      // axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(function(res){
        // console.log(res.data);
        setPost(res.data);
        return axios.get("https://jsonplaceholder.typicode.com/users/" + res.data.userId)
      })
      .then(function(res){
        // console.log(res.data);
        setUser(res.data)
      })
      .catch(function(err){
        console.log(err);
      });
    }

    function getPostData() {

    }
    function getAllComments(){
        axios.
        get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(function(res){
          console.log(res);
          setComments(res.data);
        })
        .catch();
    }
    useEffect(() => {
      getData();
      getPostData();
      getAllComments();
    }, []);
  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading
            subtitle="Management"
            title="Post Details"
          >
            <Link className="btn btn-outline-secondary btn-sm" to="/Post">
              <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to
              Posts
            </Link>
            <Link className="btn btn-primary btn-sm" to="/Post-create">
              <i className="bi bi-person-plus" aria-hidden="true"></i> Add Post
            </Link>
          </PageHeading>

          <section className="row g-3">
            <div className="col-12 col-xl-4">
              <div className="panel h-100 text-center profile-card">
                <div className="profile-cover text-bg-success"></div>
                <div className="profile-hero">
                  <img
                    className="avatar-img avatar-xl profile-photo mb-3"
                    src= {`https://i.pravatar.cc/${100 + user.id}`}
                    alt="Asia R."
                  />
                  <h2 className="h5 mb-1">{user.name}</h2>
                  <h2 className="h6 mb-3">{user.username}</h2><br />
                  <h2 className="h6 mb-2">Email :{user.email}</h2>
                  <h2 className="h6 mb-2">Phone : {user.phone}</h2>
                  <h2 className="h6 mb-2">Company : {user.company.name}</h2>
                  <h2 className="h6 mb-2">Website : {user.website}</h2>
                  <h2 className="h6 mb-2">Address : {user.address.street}, {user.address.suite}, <br/> {user.address.zipcode}</h2>
                  <h2 className="h6 mb-2">Geo : {user.address.geo.lat}, {user.address.geo.lng}</h2>

                </div>
              </div>
            </div>
            <div className="col-12 col-xl-8">
              <div className="panel mb-3">
                <div className="panel-header">                  
                  <Link to={`/Post-edit/${id}`} className="btn btn-primary btn-sm ms-auto">
                    Edit Post
                  </Link>
                </div>
                <h2 className="h5 mb-3 section-title">
                  <span>{post.title}</span>
                </h2>
                <div className="mini-card">
                    <p className="text-muted mb-0">
                      {post.body}
                    </p>
                </div>
              </div>
              <div className="panel">
                <div className="panel-header">
                  <div>
                    
                    <h2 className="h5 mb-1 section-title">
                      <i className="bi bi-clock-history" aria-hidden="true"></i>
                      <span>Comments</span>
                    </h2>

                  </div>
                </div>
                <div className="activity-list">
                  {comments.map((item)=> (
                    <div key={item.id} className="activity-item">
                      <span className="activity-dot bg-primary"></span>
                      <div>
                        <p className="mb-1 fw-semibold">
                          {item.email}
                        </p>
                        <p className="text-muted small mb-0">{item.body}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default PostDetails;
