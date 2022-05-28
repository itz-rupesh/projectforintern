import React from "react";
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import cogoToast from 'cogo-toast';
import ShowOrgProjects from "../../orgdashboard/ShowOrgProjects";
import NoDetails from "../../setupProfile/Nodetails";
import { useLocation, useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../../App";


const OrgProfileForUserLiveProject = () => {
    const navigate = useNavigate();
    const { userState } = useContext(CurrentUserContext);
    // const location = useLocation();
    // const [current_org_id] = useOutletContext();
    const [liveProjects, setLiveProject] = useState([]);

    const org__id = userState;
    //    console.log()
    useEffect(() => {
        if (org__id === "") {
            return navigate('/feed');
        }
        axios.get(`/account/feed/orgprofile/liveprojects/${org__id}`, { withCredentials: true })
            .then((res) => {
                const result = res.data.projects;
                result.sort((a, b) => (a.post_date > b.post_date) ? -1 : ((b.post_date > a.post_date) ? +1 : 0));
                setLiveProject(result);
                setLiveProject((result) => {
                    return result.filter((arrElem, index) => {
                        return arrElem.islive;
                    })
                });
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);

    return (
        <>
            {liveProjects.length === 0 ? <NoDetails message="No Projects Added" /> : liveProjects.map((object, index) => {
                return <ShowOrgProjects
                    key={index}
                    id={object._id}
                    project={object}
                    showDeleteBtn={false}
                />
            })}
        </>
    );
}


export default OrgProfileForUserLiveProject;