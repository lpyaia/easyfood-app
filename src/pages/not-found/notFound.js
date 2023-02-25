import React from "react";
import { Link } from "react-router-dom";
import error from "../../assets/images/illustrations/page-misc-error-light.png";

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="misc-wrapper">
                <h2 className="mb-2 mx-2 text-center">Page Not Found :(</h2>
                <p className="mb-4 mx-2 text-center">Oops! 😖 The requested URL was not found on this server.</p>
                <div className="d-flex justify-content-center">
                    <Link to="/" class="btn btn-primary">
                        Back to home
                    </Link>
                </div>
                <div className="mt-3">
                    <img
                        src={error}
                        alt="page-misc-error-light"
                        style={{ height: "400px", width: "500px" }}
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
