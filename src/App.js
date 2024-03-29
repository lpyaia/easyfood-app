// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/input.css";
import "./pages/header/header.css";
import "./assets/css/icon.css";
import "react-toastify/dist/ReactToastify.css";

// Imports
import React from "react";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/app/spinner";
import ScrollToTop from "./components/app/scrollToTop";
import Forbidden from "./pages/forbidden/Forbidden";
import InternalServerError from "./pages/internal-server-error/InternalServerError";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import DefaultRoutes from "./components/app/defaultRoutes";
import Home from "./pages/home/home";
import Logout from "./pages/logout/logout";
import localStorageHelper from "./utils/localStorageHelper";
import { Menu } from "./pages/menu/menu";
import { Checkout } from "./pages/checkout/checkout";
import { CheckoutFinish } from "./pages/checkout/checkout-finish";

export const UserInfoContext = React.createContext();

function App() {
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
            <UserInfoContext.Provider value={userInfoToken.userToken}>
                <ScrollToTop />
                <ToastContainer theme="colored" />
                <Spinner />
                <Routes>
                    <Route path="/login" element={<DefaultRoutes search={true} component={Home} />} />
                    <Route path="/register" element={<DefaultRoutes search={true} component={Home} />} />
                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="/sorry" element={<InternalServerError />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route exact path="/" element={<DefaultRoutes search={true} component={Home} />} />
                    <Route exact path="/menu" element={<DefaultRoutes search={false} component={Menu} />} />
                    <Route exact path="/checkout" element={<DefaultRoutes search={false} component={Checkout} />} />
                    <Route
                        exact
                        path="/checkout-finish"
                        element={<DefaultRoutes search={false} component={CheckoutFinish} />}
                    />
                </Routes>
            </UserInfoContext.Provider>
        </div>
    );
}

export default App;
