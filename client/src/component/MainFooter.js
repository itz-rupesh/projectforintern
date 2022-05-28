// import { defaultListboxReducer } from "@mui/base";
import React from "react";


const MainFooter = () => {

    return (<>
        <div className="container-fluid text-white" style={{ backgroundColor: "black" }}>
            <div className="container">
                <div className="row  text-center p-5">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 text-start">

                        <h1 className="logo-text" style={{ fontSize: "2.0rem" }}>ProjectForIntern</h1>
                        <p style={{ fontSize: "0.9rem", maxWidth: "300px" }} className="pt-3">InternIn Office, Near Swami Samarth Udyan, Shivajinagar,
                            Soegaon– 431120, Aurangabad, Maharashtra , India.</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 text-start pt-3 ps-lg-5 ">
                        <h6 className="mb-4 text-secondary ps-lg-5"><b>USEFUL LINKS</b></h6>
                        <ul className="list-unstyled ps-lg-5">
                            <li className="mb-2">Home</li>
                            <li className="mb-2">About</li>
                            <li className="mb-2">Testimonials</li>
                            <li className="mb-2">Why Us?</li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 text-start pt-3 ps-lg-5 ">
                        <h6 className="mb-4 text-secondary"><b>CONTACT US</b></h6>
                        <ul className="list-unstyled ">
                            <li className="mb-2">info@projectforintern.com</li>
                            <li className="mb-2">hr@projectforintern.com</li>
                        </ul>
                        <div>
                            <a href="#"><i className="fa-brands fa-linkedin fa-2x pe-3"></i></a>
                            <a href="#"><i className="fab fa-facebook-square  fa-2x pe-3"></i></a>
                            <a href="#"><i className="fab fa-instagram-square fa-2x pe-3"></i></a>
                            <a href="mailto:support@projectforintern.com"><i className="fas fa-envelope-square fa-2x  pe-3"></i></a>
                            <a href="#"><i className="fab fa-twitter-square fa-2x"></i></a>
                        </div>
                    </div>
                </div>
                <hr className="mt-0 mb-0" />
            </div>
        </div>
        <div className="page-footer font-small  text-white" style={{ backgroundColor: "black" }}>
            <div className="footer-copyright text-center py-3 text-secondary" style={{ fontSize: "0.7rem" }}>Copyright © projectforintern 2022. All Rights Reserved
            </div>
        </div>
    </>);
}

export default MainFooter;