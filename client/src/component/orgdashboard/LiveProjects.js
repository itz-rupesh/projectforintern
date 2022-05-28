import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import cogoToast from 'cogo-toast';

import AddOrgLiveProject from "./AddOrgLiveProjects";
import ShowOrgProjects from "./ShowOrgProjects";
import NoDetails from "../setupProfile/Nodetails";
import AddNewEntryButton from "./AddNewEntryButton";

const LiveProjects = () => {
    const [addProjectButton, setAddProjectButton] = useState(true);
    const changeButtonState = () => {
        setAddProjectButton(!addProjectButton);
    }
    const [liveProjects, setLiveProject] = useState([]);
    const [project, setProject] = useState({
        _id: '',
        title: '',
        start_date: '',
        memebers_required: '',
        technologies: [],
        description: '',
        role: '',
        work_type: '',
        location: '',
        compensation: '',
        post_date: ''

    });
    const [projTech, setProjTech] = useState([]);
    const projectChangeHanler = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setProject({ ...project, [inputName]: inputValue });
    }
    const addLiveProject = (e) => {

        if (project.title === '') return cogoToast.error("please enter project title !");
        if (project.role === '') return cogoToast.error("please enter role !");
        if (project.work_type === '') return cogoToast.error("please select work type !");
        if (project.compensation === '') return cogoToast.error("please select compensation !");
        // if (project.location === '') return cogoToast.error("please enter location !");
        if (project.start_date === '') return cogoToast.error("please enter work starting date!");
        if (project.memebers_required === '') return cogoToast.error("please enter members required !");
        if (projTech.length === 0) return cogoToast.error('Please enter skills required !');
        if (project.description === '') return cogoToast.error("please enter project description !");

        projTech.map((val, int) => project.technologies.push(val));

        axios.post('/org/newpost', project, { withCredentials: true })
            .then((res) => {
                cogoToast.success(res.data.message);
                // console.log(res.data.savedpost);
                setLiveProject([...liveProjects, res.data.savedpost]);
                setLiveProject(liveProjects => {
                    const projectToSort = liveProjects;
                    projectToSort.sort((a, b) => (a.post_date > b.post_date) ? -1 : ((b.post_date > a.post_date) ? +1 : 0));
                    return projectToSort;
                })
                setProject({
                    _id: '',
                    title: '',
                    start_date: '',
                    memebers_required: '',
                    technologies: [],
                    description: '',
                    role: '',
                    work_type: '',
                    location: '',
                    compensation: '',
                    prost_date: ''
                });
                // console.log(liveProjects);
                setProjTech([]);

            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                return;
            })
    }
    
    const addToPastProject = (id) => {
        axios.post('/org/archive', {
            _id: id
        }, { withCredentials: true }).then((res) => {

            cogoToast.success(res.data.message);
            setLiveProject((liveProjects) => {
                return liveProjects.filter((arrElem, index) => {
                    return arrElem._id !== id;
                })
            })
        }).catch((err) => {
            if (err.message === 'Network Error') {
                cogoToast.error('No internet connection');
            } else {
                return cogoToast.error(err.response.data.error);
            }
        })

    }

    useEffect(() => {
        axios.get('/org/info/liveprojects', { withCredentials: true })
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
                cogoToast.error(err.response.data.error);
            })
    }, []);

    return (
        <>
            {
                addProjectButton ? <AddNewEntryButton
                    message="add new project"
                    onSelect={changeButtonState}
                /> : <AddOrgLiveProject
                    project={project}
                    addLiveProject={addLiveProject}
                    projectChangeHanler={projectChangeHanler}
                    projTech={projTech}
                    setProjTech={setProjTech}
                    cancel={changeButtonState}
                />
            }

            {liveProjects.length === 0 ? <NoDetails message="No Projects Added" /> : liveProjects.map((object, index) => {
                return <ShowOrgProjects
                    key={index}
                    id={object._id}
                    project={object}
                    showDeleteBtn={true}
                    onSelect={addToPastProject}
                />
            })}
        </>
    );
}


export default LiveProjects;