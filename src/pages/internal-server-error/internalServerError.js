import React from "react";
import { Link } from "react-router-dom";
import internalServerError from "../../assets/images/500-internal-server-error.png";

const InternalServerError = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="misc-wrapper">
                <h2 className="mb-2 mx-2 text-center">Error :(</h2>
                <p className="mb-4 mx-2 text-center">Oh, no! 😖 Please, come back later...</p>
                <div className="d-flex justify-content-center">
                    <Link to="/" class="btn btn-primary">
                        Back to home
                    </Link>
                </div>
                <div className="mt-3">
                    <img
                        src={internalServerError}
                        alt="500-internalerror-amico"
                        style={{ height: "400px", width: "500px" }}
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default InternalServerError;
