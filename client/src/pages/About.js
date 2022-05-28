import React from "react";
import AboutImage from '../images/aboutus.svg'
import TypeAnimation from 'react-type-animation';
import MainFooter from "../component/MainFooter";

const About = () => {
    return (
        <>
        <AboutSection/>
        <MainFooter />
        </>
    );
}
const AboutSection = () => {
    return (<>
        <div className="container pb-5 mb-5" >
            <div className="row">
                <div className="col-12 text-center">
                    <h1 className="pt-5 mt-5" style={{ fontSize: "40px" }}><b>About Us</b></h1>
                    <h2 className="d-flex text-secondary justify-content-center">Platform For&nbsp;<b><TypeAnimation
                        className=""
                        cursor={true}
                        sequence={[
                            'Students',
                            2000,
                            'Recruiters',
                            2000,
                            // 'Freelancers',
                            // 2000,
                        ]}
                        wrapper="b"
                        repeat={Infinity}
                    /></b></h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 pt-5 col-md-push-1">
                    <img src={AboutImage} alt="" className="img-fluid" />
                </div>
                <div className="col-12 col-lg-6 text-start pt-3 mt-0 pt-lg-3 mt-lg-0  p-5 justify-content">
                    <p className="pt-5 mt-lg-3"> We  for are doing  a role as a talent accquition partner for corporate and helping them
                        with providing right talent as well as
                        we provided one plateform for students
                        where they can obtain information about available live pojects.
                    </p>
                    <p>A platform that provides hiring-related services and shortlisted profiles for corporates/recruiters
                        as well as a platform for corporations to publish their live projects vacancies on our platform.
                        .....great way of gaining hands-on experience and insight into a career.
                        Along with that for students and corporations .... provides :
                    </p>
                    <ul>
                        <li>Helps to find Live project experience to freshers</li>
                        <li>Find your perfect match intern for project</li>
                        <li>Create your profile like mini resume</li>
                        <li>Live chat with matched user/organization</li>
                        <li>Certificate and Rating on Completion.</li>
                        <li>Live Projects Updates</li>
                    </ul>
                </div>

            </div>
        </div>
    </>)
}
export default About;
export { AboutSection };