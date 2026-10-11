import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import axios from "axios"
import { defaultMember, type Member } from "../../../interfaces/Member"
import { API_BASE_URL } from "../../../config"

function MemberDetails() {

    const { id } = useParams();
    const [member, setMember] = useState<Member>(defaultMember);
    const [notFound, setNotFound] = useState(false);

    function getMember() {
        axios
            .get(API_BASE_URL + "/members/" + id)
            .then((res) => setMember(res.data))
            .catch((err) => {
                console.log(err);
                setNotFound(true);
            });
    }

    useEffect(() => {
        getMember();
    }, []);

    if (notFound) {
        return (
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <div className="card-body text-center py-5">
                        <h5 className="mb-2">Member not found</h5>
                        <p className="text-body-secondary mb-4">This member may have been removed.</p>
                        <Link to="/member" className="btn btn-primary">Back to Members</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <div className="avatar avatar-md me-3">
                            <img
                                src={`../../assets/img/avatars/${member.avatar}`}
                                alt="Avatar"
                                className="rounded-circle"
                            />
                        </div>
                        <div>
                            <h4 className="mb-1">{member.name}</h4>
                            <p className="mb-0 text-body-secondary">{member.role}</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to={`/member-edit/${id}`} className="btn btn-primary">
                            <i className="icon-base ti tabler-pencil me-1"></i>
                            Edit Member
                        </Link>
                        <Link to="/member" className="btn btn-label-secondary">
                            <i className="icon-base ti tabler-arrow-left me-1"></i>
                            Back to Members
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <h5 className="card-header">Overview</h5>
                    <div className="card-body">
                        <div className="row g-4">
                            <div className="col-6 col-md-3">
                                <p className="text-body-secondary mb-1">Email</p>
                                <p className="fw-medium mb-0">{member.email}</p>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-body-secondary mb-1">Status</p>
                                <span className={`badge bg-label-${member.status === "Active" ? "success" : "secondary"}`}>
                                    {member.status}
                                </span>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-body-secondary mb-1">Projects</p>
                                <p className="fw-medium mb-0">{member.projectsCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MemberDetails
