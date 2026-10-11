import { useState } from "react"

interface ProfileForm {
    name: string;
    email: string;
    phone: string;
    role: string;
    bio: string;
}

function Profile() {

    const [profile, setProfile] = useState<ProfileForm>({
        name: "Admin User",
        email: "admin@example.com",
        phone: "+880 1XXXXXXXXX",
        role: "Project Manager",
        bio: "",
    });

    const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
    const [saved, setSaved] = useState(false);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
    }

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // No backend yet — this only updates local state.
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.next !== password.confirm) {
            alert("New password and confirm password do not match.");
            return;
        }
        alert("Password change will be enabled once the backend is connected.");
        setPassword({ current: "", next: "", confirm: "" });
    }

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="mb-4">
                <h4 className="mb-1">Account Settings</h4>
                <p className="mb-0 text-body-secondary">Manage your profile information and password.</p>
            </div>

            {saved && (
                <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <i className="icon-base ti tabler-circle-check me-2"></i>
                    Profile updated locally. This will be saved permanently once the backend is connected.
                </div>
            )}

            <div className="row g-4">
                {/* Profile picture card */}
                <div className="col-12 col-lg-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="avatar avatar-xl mx-auto mb-3">
                                <span className="avatar-initial rounded-circle bg-label-primary">
                                    {profile.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h5 className="mb-1">{profile.name}</h5>
                            <p className="text-body-secondary mb-3">{profile.role}</p>
                            <button type="button" className="btn btn-label-secondary btn-sm" disabled>
                                <i className="icon-base ti tabler-upload me-1"></i>
                                Upload New Photo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile form */}
                <div className="col-12 col-lg-8">
                    <div className="card mb-4">
                        <h5 className="card-header">Profile Information</h5>
                        <div className="card-body">
                            <form onSubmit={handleProfileSubmit}>
                                <div className="row g-4">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            value={profile.name}
                                            onChange={handleProfileChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            className="form-control"
                                            value={profile.phone}
                                            onChange={handleProfileChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="role">Role</label>
                                        <input
                                            type="text"
                                            id="role"
                                            name="role"
                                            className="form-control"
                                            value={profile.role}
                                            onChange={handleProfileChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="bio">Bio</label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            className="form-control"
                                            rows={3}
                                            placeholder="A short bio about yourself"
                                            value={profile.bio}
                                            onChange={handleProfileChange}
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="current">Current Password</label>
                                        <input
                                            type="password"
                                            id="current"
                                            name="current"
                                            className="form-control"
                                            value={password.current}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="next">New Password</label>
                                        <input
                                            type="password"
                                            id="next"
                                            name="next"
                                            className="form-control"
                                            value={password.next}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="confirm">Confirm New Password</label>
                                        <input
                                            type="password"
                                            id="confirm"
                                            name="confirm"
                                            className="form-control"
                                            value={password.confirm}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile
