import React from "react";
import { Link } from "react-router-dom";
import forbidden from "../../assets/images/403-forbidden-amico.png";

const Forbidden = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="misc-wrapper">
                <h2 className="mb-2 mx-2 text-center">Forbidden :(</h2>
                <p className="mb-4 mx-2 text-center">Oh, no! 😖 You're not allowed to access the requested content.</p>
                <div className="d-flex justify-content-center">
                    <Link to="/" class="btn btn-primary">
                        Back to home
                    </Link>
                </div>
                <div className="mt-3">
                    <img
                        src={forbidden}
                        alt="403-forbidden-amico"
                        style={{ height: "400px", width: "500px" }}
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
