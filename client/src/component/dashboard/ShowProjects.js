import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { ShowProject } from "../setupProfile/ShowProject";
import NoDetails from "../setupProfile/Nodetails";

const ShowProjects = (props) => {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios.get('/account/info/projects', { withCredentials: true })
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

export default ShowProjects;