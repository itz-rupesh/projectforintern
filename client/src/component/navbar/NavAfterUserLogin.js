
import React from "react";
import UserDropDown from "./UserDropDown";

const NavAfterUserLogin = () => {
    return (
        <div>
            <nav id="navbar" className=" pt-0 pb-0 ps-3 container-row navbar-dark navbar navbar-expand-lg nav-div fixed-top">
                <div className="container">
                    <div className="navbar-brand">
                        <h1 className="logo-text mt-1">ProjectForIntern</h1>
                    </div>
                    <div className="nav-list">
                        <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0">
                            <UserDropDown />
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default NavAfterUserLogin;