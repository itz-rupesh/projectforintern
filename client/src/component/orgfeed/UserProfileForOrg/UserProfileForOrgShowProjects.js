import axios from "axios";
// import cogoToast from "cogo-toast";
import React, { useEffect, useState,useContext } from "react";
import { ShowProject } from "../../setupProfile/ShowProject";
import NoDetails from "../../setupProfile/Nodetails";
// import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../../App";


const UserProfileForOrgShowProjects = () => {
    const navigate = useNavigate();
    const { userState } = useContext(CurrentUserContext);

    const [projects, setProjects] = useState([]);
    // const [current_user_id] = useOutletContext();
    useEffect(() => {
        if (userState === "") {
            return navigate('/organization/orgfeed');
        }
        axios.get(`/org/feed/userprofile/projects/${userState}`, { withCredentials: true })
            .then((res) => {
                setProjects(res.data.projects);
                // console.log(projects);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, [])

    return (
        <>
            {
                projects.length === 0 ? <NoDetails message="No Project Details Provided" /> : projects.map((itemval, index) => {
                    return <ShowProject
                        key={index}
                        id={index}
                        title={itemval.title}
                        type={itemval.project_type}
                        link={itemval.link}
                        description={itemval.description}
                        technologies={itemval.technologies}
                        showDeleteBtn={false}
                        role={itemval.role}

                    />
                })
            }

        </>
    );
}

export default UserProfileForOrgShowProjects;