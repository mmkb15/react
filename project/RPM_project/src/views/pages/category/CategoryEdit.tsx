import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import axios from "axios"
import { defaultCategory, type Category } from "../../../interfaces/Category"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

function CategoryEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<Category>(defaultCategory);
    const [msg, setMsg] = useState("");

    function getCategory() {
        axios
            .get(API_BASE_URL + "/categories/" + id)
            .then((res) => setForm(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCategory();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        axios
            .put(API_BASE_URL + "/categories/" + id, form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Category updated successfully!");
                navigate("/category");
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Category update failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: "Categories", to: "/category" },
                        { label: "Edit Category" },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Edit Category</h4>
                        <p className="mb-0 text-body-secondary">Update the category details below.</p>
                    </div>
                    <Link to="/category" className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Categories
                    </Link>
                </div>

                {msg !== "" && (
                    <div className="alert alert-info" role="alert">
                        {msg}
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="row g-4">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="name">Category Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        rows={3}
                                        value={form.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <Link to="/category" className="btn btn-label-secondary">
                                        Cancel
                                    </Link>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Update Category
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CategoryEdit
