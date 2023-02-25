// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/input.css";
import "./assets/css/header.css";
import "./assets/css/icon.css";
import "react-toastify/dist/ReactToastify.css";

// Imports
import React from "react";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/app/spinner";
import ScrollToTop from "./components/app/scrollToTop";
import RoleAccess from "./enums/roleEnum";
import Forbidden from "./pages/forbidden/Forbidden";
import InternalServerError from "./pages/internal-server-error/InternalServerError";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import useToken from "./components/app/userInfoHook";
import DefaultRoutes from "./components/app/defaultRoutes";
import Home from "./pages/home/home";
import Logout from "./pages/logout/logout";
import useAppRefresh from "./components/app/useAppRefreshHook";
import localStorageHelper from "./utils/localStorageHelper";

function App() {
    // const { userInfo, setUserInfo } = useToken();
    const { appRefreshFlag, setAppRefresh } = useAppRefresh();
    const userInfoToken = localStorageHelper.getUserInfo();

    if (!userInfoToken?.accessToken) {
        return (
            <div>
                <ScrollToTop />
                <ToastContainer theme="colored" />
                <Spinner />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Login />} />
                    <Route exact path="/" element={<Login />} />
                </Routes>
            </div>
        );
    }

    return (
        <div className="App">
            <ScrollToTop />
            <ToastContainer theme="colored" />
            <Spinner />
            <Routes>
                <Route path="/login" element={<DefaultRoutes component={Home} />} />
                <Route path="/register" element={<DefaultRoutes component={Home} />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/sorry" element={<InternalServerError />} />
                <Route path="/logout" element={<Logout />} />
                <Route exact path="/" element={<DefaultRoutes component={Home} />} />
            </Routes>
        </div>
    );
}

export default App;
