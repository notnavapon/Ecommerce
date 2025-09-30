import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./page/components/Navbar";
import HomePage from "./page/homepage/HomePage";
import LoginPage from "./page/loginpage/LoginPage";
import RegisterPage from "./page/registerpage/RegisterPage";
import SettingPage from "./page/settingpage/SettingPage";


import { checkCurrentUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user} = useSelector((state) => state.auth);
  // console.log("userinapp:", user);

  useEffect(() => {
    if (!user) {
      dispatch(checkCurrentUser());
    }
  }, []);

  return (
    <div data-theme="dim">
      <BrowserRouter>
        <NavBar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/setting" element={<SettingPage />} />
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
