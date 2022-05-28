import React, { useContext } from "react";
import './navbar.css';
import NavAfterUserLogin from "./NavAfterUserLogin";
import NavBeforeLogin from "./NavBeforeLogin";
import NavAfterOrgLogin from "./NavAfterOrgLogin";
import { NavbarContext } from "../../App";

const Navbar = () => {
    const { state, dispatch } = useContext(NavbarContext);
    const RenderMenu = () => {
        switch (state.userState) {
            case "USER":
                return <NavAfterUserLogin />;
            case "ORGANIZATION":
                return <NavAfterOrgLogin />;
            case "UNAUTHORIZED":
                return <NavBeforeLogin />;
            default:
                return <NavBeforeLogin />;
        }
    }
    return (<>
        <RenderMenu />
    </>
    );
}

export default Navbar;






// const Navbar = () => {
//     return (
//         <div>
//             <nav id="navbar" className=" pt-0 pb-0 ps-3 container-row navbar-dark navbar navbar-expand-lg nav-div fixed-top">
//                 <div className="container">
//                     <div className="navbar-brand">
//                         <h1 className="logo-text mt-1">ProjectForIntern</h1>
//                     </div>
//                     <span style={{ border: "none", color: "white" }} className="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
//                         aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//                         <Hamburger />
//                     </span>
//                     <div className="nav-list collapse navbar-collapse" id="navbarTogglerDemo02">
//                         <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0">
//                             <li className="nav-item"><Link className="nav-linkk" aria-current="page" to="/home" > Home</Link></li>
//                             <NavLink link="/dashboard" title="Dashboard" />
//                             <NavLink link="/feed" title="feed" />
//                             <li className="nav-item"><Link className="nav-linkk" to="/setup">Setup Profile</Link></li>
//                             <NavLink link="/login/signin" title="Log-in" />
//                             <li className="nav-item"><Link className="nav-linkk" to="/logout">Logout</Link></li>
//                             <UserDropDown />
//                         </ul>
//                     </div>


//                 </div>
//             </nav>
//         </div>
//     );
// }