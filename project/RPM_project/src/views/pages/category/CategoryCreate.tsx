import { useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import { defaultCategory, type Category } from "../../../interfaces/Category"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

function CategoryCreate() {

    const navigate = useNavigate();
    const [form, setForm] = useState<Category>(defaultCategory);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({ name: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        const newErrors = { name: "" };
        if (form.name === "") newErrors.name = "Category name is required";
        setErrors(newErrors);

        if (newErrors.name !== "") return;

        axios
            .post(API_BASE_URL + "/categories", form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Category created successfully!");
                navigate("/category");
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Category create failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: "Categories", to: "/category" },
                        { label: "Add Category" },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Add New Category</h4>
                        <p className="mb-0 text-body-secondary">Categories help group projects by type.</p>
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
                                        placeholder="e.g. Web Development"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    <small className="text-danger">{errors.name}</small>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        rows={3}
                                        placeholder="Short description"
                                        value={form.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setForm(defaultCategory)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Create Category
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
export default CategoryCreate
