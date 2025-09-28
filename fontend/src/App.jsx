import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./page/components/Navbar";
import HomePage from "./page/homepage/HomePage"
import LoginPage from "./page/loginpage/LoginPage";
import RegisterPage from "./page/registerpage/RegisterPage";


import { checkCurrentUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkCurrentUser());
  }, [dispatch]);

  return (
    <div data-theme="ligth">
      <BrowserRouter>
        <NavBar />
        <div className="min-h-screen">
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
