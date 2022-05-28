import React from "react";
import { Link } from "react-router-dom";
import { Sling as Hamburger } from 'hamburger-react';

const NavBeforeLogin = () => {

    return (
        <div>
            <nav id="navbar" className=" pt-0 pb-0 ps-3 container-row navbar-dark navbar navbar-expand-lg nav-div fixed-top">
                <div className="container">
                    <div className="navbar-brand">
                        <h1 className="logo-text mt-1">ProjectForIntern</h1>
                    </div>
                    <span style={{ border: "none", color: "white" }} className="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <Hamburger />
                    </span>
                    <div className="nav-list collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavLink link="/home" title="Home" />
                            <NavLink link="/about" title="About" />
                            {/* {
                                ShowAboutLink && <li className="nav-item">
                                    <a href="#about" className="nav-linkk">About</a></li>
                            } */}


                            <NavLink link="/login/signin" title="Join us" />
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
const NavLink = (props) => {
    return (
        <li className="nav-item"><Link className="nav-linkk" to={props.link}>{props.title}</Link></li>
    );
}

export default NavBeforeLogin;