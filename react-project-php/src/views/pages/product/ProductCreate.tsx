import { Link } from "react-router";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading.tsx";
import  { defaultProduct, type Product } from "../../../interfaces/Product.ts";
import { api } from "../../../config.tsx";
import type { Brand } from "../../../interfaces/Brand.ts";
import type { Category } from "../../../interfaces/Category.ts";

function ProductCreate() {
  const [product, setProduct] = useState<Product>(defaultProduct);
  const[brands, setBrand] = useState<Brand[]>([]);
  const[categroy, setCategory] = useState<Category[]>([]);
  const [msg, setMsg] = useState<string | null>(null);


  function getBrands(){
    api
    .get("brands")
    .then((res) => {
      console.log(res.data);
      setBrand(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function getCategory(){
    api
    .get("categroies")
    .then((res) => {
      console.log(res.data);
      setCategory(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getBrands();
    getCategory();
  }, [])

  function handleSubmit(){
    console.log(product);
    let data = new FormData();
    data.append("name", product.name);
    data.append("category_id", product.category_id.toString());
    data.append("brand_id", product.brand_id.toString());
    data.append("desc", product.short_description.toString());
    data.append("price", product.price.toString());
    data.append("qty", product.quantity.toString());
    data.append("restock", product.point_of_restock.toString());
    data.append("name", product.active.toString());
    if(product.image) data.append("name", product.image);
    
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

                {msg && (
                    <div
                        className={`alert ${
                            msg === "success" ? "alert-success" : "alert-danger"
                        } alert-dismissible fade show mb-3`}
                        role="alert"
                    >
                        {msg === "success"
                            ? "Data saved successfully."
                            : "Something went wrong!"
                        }

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setMsg(null)}
                        />
                    </div>
                )}


              {/* Form */}
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
                      value={product.name}
                      onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="role">
                      Category
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      value={product.brand_id}
                      onChange={(e) =>
                        setProduct({ ...product, brand_id: Number(e.target.value) })
                      }
                    >
                      <option value={0} disabled>
                        Choose Category...
                      </option>
                      {categroy.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="role">
                      Brand
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      value={product.brand_id}
                      onChange={(e) =>
                        setProduct({ ...product, brand_id: Number(e.target.value) })
                      }
                    >
                      <option value={0} disabled>
                        Choose Brand...
                      </option>
                      {brands.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="password">
                      Price
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        setProduct({ ...product, price: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="password">
                      Quantity
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        setProduct({ ...product, quantity: Number(e.target.value )})
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="password">
                      Restock Qty
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="number"
                      value={product.point_of_restock}
                      onChange={(e) =>
                        setProduct({ ...product, point_of_restock: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="password">
                      Desc
                    </label>
                    <textarea className="form-control"></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="password">
                      Image
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="file"
                      onChange={(e) =>
                        setProduct({...product,image: e.target.files?.[0] ?? null,})
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="active"
                      />
                      <label className="form-check-label" htmlFor="active">
                        Is active
                      </label>
                    </div>
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
export default ProductCreate;
