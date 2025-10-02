import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // send data to backend
  const [profilePic, setProfilePic] = useState(null);

  //preview pic on font
  const [previewPic, setPreviewPic] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (profilePic) {
      data.append("profilePic", profilePic)
    }

    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ": ", pair[1]);
    // }

    dispatch(registerUser(data));

    // navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      // สร้าง URL ชั่วคราวจากไฟล์
      setPreviewPic(URL.createObjectURL(file));
    }
    console.log(profilePic);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hero bg-gradient-to-br from-base-200 to-base-300 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          {/* Card */}

          <div className="card bg-base-100 w-screen max-w-md shadow-2xl rounded-2xl">
            <div className="card-body">
              <div className="text-center ">
                <h1 className="text-5xl font-bold">Create Account</h1>
              </div>

              {/* upload pic */}
              <div className="flex flex-col items-center gap-2">
                <label className="relative cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-primary transition">
                  {previewPic ? (
                    <img
                      src={previewPic}
                      alt="profilepic Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-center text-sm">
                      Upload
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-xs text-gray-500">Profile Picture</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset className="fieldset space-y-3">
                  {/* Username */}
                  <div>
                    <label className="label font-medium">Username</label>
                    <label className="input input-bordered flex items-center gap-2 h-12 w-full">
                      <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </g>
                      </svg>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minLength="3"
                        maxLength="30"
                        className="grow"
                      />
                    </label>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="label font-medium">Email</label>
                    <label className="input input-bordered flex items-center gap-2 h-12 w-full">
                      <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <rect
                            width="20"
                            height="16"
                            x="2"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                      </svg>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="grow"
                      />
                    </label>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="label font-medium">Password</label>
                    <label className="input input-bordered flex items-center gap-2 h-12 w-full">
                      <svg
                        className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                          <circle
                            cx="16.5"
                            cy="7.5"
                            r=".5"
                            fill="currentColor"
                          ></circle>
                        </g>
                      </svg>

                      <input
                        type={!showPassword ? "password" : "text"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                        minLength="6"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                        className="grow"
                      />
                      <button onClick={() => setShowPassword((prev) => !prev)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      At least 6 characters, 1 uppercase, 1 lowercase, 1 number
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 mt-4">
                    <button className="btn btn-neutral w-full h-12">
                      Register
                    </button>
                    <Link to="/login" className="btn btn-neutral w-full h-12">
                      Already have an account? Login
                    </Link>
                    <a className="link link-hover text-sm text-center mt-1">
                      Forgot password?
                    </a>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
