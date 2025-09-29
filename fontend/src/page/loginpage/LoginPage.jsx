import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, checkCurrentUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [loginFormData, setLoginFromData] = useState({
    email: "",
    password: "",
  });

  const [update, setUpdate] = useState(false);

  const handleChange = (e) => {
    setLoginFromData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async(e) => {
    e.preventDefault();
    const checkAuth = await dispatch(loginUser(loginFormData));
    if (loginUser.fulfilled.match(checkAuth)) {
      // ถ้า login สำเร็จ → เรียก checkCurrentUser
      dispatch(checkCurrentUser());
      navigate("/");
    } else {
      console.log("Login failed:", checkAuth.payload);
    }
    setUpdate(prev=>!prev)
    navigate("/");
  };

  useEffect(() => {
    console.log("user in loginpage", user);
  }, [user]);

  const handleLogout = () => {};

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Toaster />
      <div className="hero bg-gradient-to-br from-base-200 to-base-300 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div className="card bg-base-100 w-screen max-w-md shadow-2xl rounded-2xl">
            <div className="card-body">
              <div className="text-center ">
                <h1 className="text-5xl font-bold ">Login now!</h1>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <fieldset className="fieldset space-y-3">
                  {/* Email */}
                  <div>
                    <label className="label font-medium">Email</label>
                    <div>
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
                          value={loginFormData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="grow"
                        />
                      </label>
                    </div>
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
                        value={loginFormData.password}
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
                  </div>

                  {/* Forgot password */}
                  <div className="text-right">
                    <a className="link link-hover text-sm">Forgot password?</a>
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="text-sm text-red-500 font-medium">
                      {error.message}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-3 mt-4">
                    <button type="submit" className="btn btn-neutral w-full">
                      Login
                    </button>
                    <Link
                      to="/register"
                      className="btn btn-neutral w-full"
                      onClick={handleLogout}
                    >
                      Register
                    </Link>
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

export default LoginPage;
