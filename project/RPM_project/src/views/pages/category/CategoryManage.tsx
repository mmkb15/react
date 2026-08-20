import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import { type Category } from "../../../interfaces/Category"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

function CategoryManage() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [msg, setMsg] = useState("");

    function getAllCategories() {
        axios
            .get(API_BASE_URL + "/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    function handleDelete(id?: number) {
        if (!id) return;
        const ok = window.confirm("Delete this category? Projects using it will keep the old value.");
        if (!ok) return;

        axios
            .delete(API_BASE_URL + "/categories/" + id)
            .then((res) => {
                if (res.status === 200) setMsg("🎉 Category deleted successfully!");
                getAllCategories();
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Category delete failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: "Categories" },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Project Categories</h4>
                        <p className="mb-0 text-body-secondary">Categories used to group projects (e.g. Web, Mobile, Marketing).</p>
                    </div>
                    <Link to="/category-create" className="btn btn-primary">
                        <i className="icon-base ti tabler-plus me-1"></i>
                        Add New Category
                    </Link>
                </div>

                {msg !== "" && (
                    <div className="alert alert-info" role="alert">
                        {msg}
                    </div>
                )}

                <div className="card">
                    <h5 className="card-header">All Categories</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="fw-medium text-heading">{category.name}</td>
                                        <td>{category.description || "—"}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="icon-base ti tabler-dots-vertical"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item waves-effect" to={`/category-edit/${category.id}`}>
                                                        <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                    </Link>
                                                    <a
                                                        className="dropdown-item waves-effect"
                                                        href="javascript:void(0);"
                                                        onClick={() => handleDelete(category.id)}
                                                    >
                                                        <i className="icon-base ti tabler-trash me-1"></i> Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4 text-body-secondary">
                                            No categories yet. Click "Add New Category" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CategoryManage
