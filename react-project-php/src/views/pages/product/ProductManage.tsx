import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading.tsx";
import { useEffect, useState } from "react";
import type { Product } from "../../../interfaces/Product.ts";
import { api, basePath } from "../../../config.tsx";

function ProductManage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteItem, setDeleteItem] = useState({id: 0, name: ""});
  const getProducts = () => {
    api
      .get("products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

 function handleDelete(id:number){
  api
  .delete("users-delete?id=" + id)
  .then(res=>{ 
    if(res.status == 200){
      getProducts();
    }
    
  })
  .catch
 }
  

  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading icon="people" subtitle="Management" title="Products">
            <Link to="/product-create" className="btn btn-primary">
              <i className="bi bi-plus-lg me-1"></i> Add New
            </Link>
          </PageHeading>

          <section className="row g-3 mt-1" aria-label="Product summary">
            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-primary">
                <div className="metric-top">
                  <span className="metric-label">Total Products</span>
                  <span className="metric-icon">
                    <i className="bi bi-people" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="metric-value">{products.length}</div>
                <div className="metric-meta">
                  <span className="text-success">+5.1%</span>
                  <span>this month</span>
                </div>
              </article>
            </div>
          </section>

          <section className="panel mt-3">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                id="usersTable"
                data-searchable-table=""
              >
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Categroy</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Price</th>
                    <th scope="col">QTY</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>

                        {(item.img_path != null && item.img_path != "") && (
                          <div className="d-flex align-items-center gap-2">
                            <img
                              className="avatar-img avatar-sm"
                              src={basePath + item.img_path}
                              alt={item.name}
                            />
                            <div>
                              <p className="fw-semibold mb-0">{item.name}</p>
                            </div>
                          </div>
                        )}
                        
                      </td>
                      <td>{item.category}</td>
                      <td>{item.brand}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <div className="d-flex gap-1 justify-content-end">
                          <Link
                            to={`/product-details/${item.id}`}
                            className="btn btn-sm btn-outline-success"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/product-edit/${item.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={()=>{
                              setDeleteItem(
                                {id: Number(item.id), name: item.name}
                              )}
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
              <p className="text-muted small mb-0">
                Showing 1 to 5 of 124 users
              </p>
              <nav aria-label="Users pagination">
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </div>
      </main>

      {/* Modal */}
        {/* <!-- Modal --> */}
        <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title fs-5" id="exampleModalLabel">Delete User</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center p-5">
                <span className="badge border border-danger text-danger fs-4 mb-3">User : {deleteItem.name}</span>
                <h3>Are you sure ?</h3> 
                <p>Do you want to delete this user ?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal"
                  >
                    Close
                 </button>
                <button
                  type="button" 
                  className="btn btn-danger"
                  onClick={()=> handleDelete(deleteItem.id)}
                  data-bs-dismiss="modal"
                  >
                    Delete
                </button>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
export default ProductManage;
