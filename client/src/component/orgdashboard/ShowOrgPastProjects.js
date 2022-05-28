import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import cogoToast from 'cogo-toast';

import ShowOrgProjects from "./ShowOrgProjects";
import NoDetails from "../setupProfile/Nodetails";

const ShowOrgPastProjects = () => {

    const [pastProject, setPastProject] = useState([]);
    useEffect(() => {
        axios.get('/org/info/liveprojects', { withCredentials: true })
            .then((res) => {
                const result = res.data.projects;
                result.sort((a, b) => (a.post_date > b.post_date) ? -1 : ((b.post_date > a.post_date) ? +1 : 0));
                setPastProject(result);
                setPastProject((result) => {
                    return result.filter((arrElem, index) => {
                        return !arrElem.islive;
                    })
                });

            }).catch((err) => {
                console.log(err.response.data.error);
            })
    }, []);


    return (
        <>
            {pastProject.length === 0 ? <NoDetails message="No Projects Added" /> : pastProject.map((object, index) => {
                return <ShowOrgProjects
                    key={index}
                    id={index}
                    project={object}
                    showDeleteBtn={false}
                // onSelect={deleteEducation}
                />
            }
            )}
        </>
    );
}

export default ShowOrgPastProjects;
