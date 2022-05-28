import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SaveBtn from '../support/SaveBtn';
import cogoToast from 'cogo-toast';
import "@pathofdev/react-tag-input/build/index.css";        // IMPORTING tag input CSS
import './setupprofile.css';
import { useNavigate } from 'react-router-dom';
import ShowEducation from './ShowEducation';
import { ShowProject } from './ShowProject';
import NoDetails from './Nodetails';
import ShowAchievement from './ShowAchievement';
import AddEducation from './AddEducation';
import AddProject from './AddProject';
import AddAchievement from './AddAchievement';
import Heading from './Heading';
import AddSkills from './AddSkills';
import { ShowSocialLink } from './ShowSocialLink';
import AddSocilaLink from './AddSocialLink';
import { NavbarContext } from '../../App';

const SetupProfile = () => {
    const { state, dispatch } = useContext(NavbarContext);
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);                   // SKILL SET -- ARRAY OF STRINGS
    const [profession, setProfession] = useState({
        profession: '',
        yoe: 0
    });
    let disableExp = false;
    // const [disableExp, setDisableExp] = useState(false);
    const [eduDetails, setEduDetails] = useState([]);       // EDUCATION DETAILS -- ARRAY OF OBJECT
    const [eduDetailsObj, setEduDetailsObj] = useState({    // EDUCATION DETAILS -- OBJECT
        degree_type: '',
        degree: '',
        college: '',
        yop: ''
    });

    const [projects, setProjects] = useState([]);            // PROJECT DETAILS -- ARRAY OF OBJECTS
    const [projectObj, setProjectObj] = useState({                 // PROJECT DETAILS -- OBJECT
        title: '',
        project_type: '',
        link: '',
        technologies: [],
        role: '',
        description: ''
    });
    const [projTech, setProjTech] = useState([]);

    const [achievements, setAchievements] = useState([]);
    const [achievObj, setAchievObj] = useState({
        title: '',
        document: '',
        description: '',
    })

    const professionChangeHandler = async (e) => {

        let name = e.target.name;
        let value = e.target.value;
        // console.log(name, value);
        setProfession({ ...profession, [name]: value });
        // if (value === 'Student') {
        //     // disableExp = true;
        //     setProfession({ ...profession, yoe: 0 });
        //     console.log(profession);
        // } else {
        //     // disableExp = false;
        // }

    }

    const addEduDetals = (e) => {                          // ADDIGN EDUCATIONAL DETAILS OBJECT INTO ARRAY OF OBJECT 'eduDetails'
        e.preventDefault();
        setEduDetails([...eduDetails, eduDetailsObj]);
        setEduDetailsObj({ degree_type: '', degree: '', college: '', yop: '' });

    }
    const eduChangeHanler = (e) => {                          // PREPARING EDUCATIONAL DETAILS OBJECT 'eduDetailsObj'
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setEduDetailsObj({ ...eduDetailsObj, [inputName]: inputValue });
    }
    const deleteEducation = (id) => {                        // DELETING AN EDUCATIONAL DETAILS OBJECT FROM ARRAY OF OBJECT 'eduDetails'
        setEduDetails((eduDetails) => {
            return eduDetails.filter((arrElem, index) => {
                return index !== id;
            })
        })
    }

    const projectChangeHanler = (e) => {                        // PREPARING EDUCATIONAL DETAILS OBJECT 'projectObj'
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setProjectObj({ ...projectObj, [inputName]: inputValue });
    }
    const addProjectDetails = (e) => {                          // ADDIGN EDUCATIONAL DETAILS OBJECT INTO ARRAY OF OBJECT 'projects'
        e.preventDefault();
        if (projTech.length === 0) {
            cogoToast.error('Please enter technologies of the project!');
            return;
        }
        projTech.map((val, int) => projectObj.technologies.push(val));
        // projectObj.technologies.push([...projTech]);
        setProjects([...projects, projectObj]);
        setProjectObj({ title: '', project_type: '', link: '', technologies: [], role: '', description: '' });
        setProjTech([]);

    }
    const deleteProject = (id) => {                        // DELETING A PROJECT DETAILS OBJECT FROM ARRAY OF OBJECT 'projects'
        setProjects((projects) => {
            return projects.filter((arrElem, index) => {
                return index !== id;
            })
        })
    }

    const addAchievDetails = (e) => {                        // ADDIGN ACHIEVEMENT DETAILS OBJECT INTO ARRAY OF OBJECT 'achievement'
        e.preventDefault();
        setAchievements([...achievements, achievObj]);
        setAchievObj({ title: '', document: '', description: '' });
        setSelectedFile({ filename: '', fileUrl: '' });
    }
    const achievChangeHandler = (e) => {                       // PREPARING ACHIEVEMENT DETAILS OBJECT 'achievObj'
        const name = e.target.name;
        const value = e.target.value;
        setAchievObj({ ...achievObj, [name]: value });
    }

    // FILE UPLOADING START
    const [selectedFile, setSelectedFile] = useState({
        filename: '',
        fileUrl: ''
    });
    const [isDisable, setIsDisable] = useState(false);
    const docUploader = (e) => {

        setIsDisable(true);
        const formData = new FormData();
        formData.append('postDoc', e.target.files[0]);
        axios.post('/document/user/uploader', formData, { withCredentials: true }).then((res) => {
            console.log(res.data.url);
            setAchievObj({ ...achievObj, document: res.data.url });
            cogoToast.success(res.data.message);
            setIsDisable(false);
            setSelectedFile({ filename: e.target.files[0].name, fileUrl: res.data.url });
            e.target.value = '';
        }).catch((err) => {
            cogoToast.error(err.response.data.error);
            setIsDisable(false);
            e.target.value = '';
        })
    }
    const deleteAchievement = (id) => {                        // DELETING A ACHIEVEMENT DETAILS OBJECT FROM ARRAY OF OBJECT 'achievement'
        setAchievements((achievements) => {
            return achievements.filter((arrElem, index) => {
                return index !== id;
            })
        })
    }

    // SOCIAL LINK AND ICON  START
    const [socialLink, setSocialLink] = useState([]);
    const [socialLinkObj, setSocialLinkObj] = useState({
        icon: 'fas fa-globe fa-lg p-2',
        link: '',
    });
    const socialIconHandler = (e) => {
        setSocialLinkObj({ ...socialLinkObj, icon: e });
    }
    const socialLinkHandler = (e) => {
        setSocialLinkObj({ ...socialLinkObj, link: e.target.value });
    }
    const addSocialLinkIcon = (e) => {
        e.preventDefault();
        setSocialLink([...socialLink, socialLinkObj]);
        setSocialLinkObj({ icon: 'fas fa-globe fa-lg p-2', link: '' });
    }
    const deleteSocialLink = (id) => {                        // DELETING AN EDUCATIONAL DETAILS OBJECT FROM ARRAY OF OBJECT 'eduDetails'
        setSocialLink((socialLink) => {
            return socialLink.filter((arrElem, index) => {
                return index !== id;
            })
        })
    }
    // SOCIAL LINK & ICON END

    const saveDetails = (e) => {
        if (skills.length <= 2) {
            cogoToast.error("please Enter at least 3 skills !!");
            return;
        }
        if (profession.profession === '') {
            cogoToast.error("please select Profession!");
            return;
        }
        if (eduDetails.length <= 0) {
            cogoToast.error("Please Add At least One Educational Details");
            return;
        }
        if (socialLink.length === 0)
            return cogoToast.error("please enter social links");

        const setMyProfile = {
            skills: skills,
            profession: profession,
            education: eduDetails,
            projects: projects,
            achievements: achievements,
            socialLinks: socialLink

        };
        axios.post('/account/setup', setMyProfile, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    cogoToast.success(res.data.message);
                    dispatch({ type: "USER", payload: { image: res.data.image, name: res.data.name } });
                    navigate('/dashboard');
                }
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                navigate('/login/signin');
            })
    }

    const showSetupProfile = () => {                  // USER AUTHENTICATION 
        axios.get('/account/verify', { withCredentials: true })
            .then((res) => {
            }).catch((err) => {
                cogoToast.error("Session expire, Please login again");
                navigate('/login/signin');
            })
    }
    useEffect(() => {
        // console.log("useEffect called");
        showSetupProfile();
    }, []);

    return (
        <>
            <div className='container mt-5'>
                <Heading text="Setup your Profile" />
                <AddSkills
                    skills={skills}
                    setSkills={setSkills}
                    profession={profession}
                    professionChangeHandler={professionChangeHandler}
                    disableExp={disableExp}
                />

                {/* EDUCATIONAL  DETAILS */}
                <Heading text="Educational Details" />
                {/* SHOWING EDUCATIONAL DETAILS */}
                {eduDetails.length === 0 ? <NoDetails message="No Education Details Provided" /> : eduDetails.map((itemval, index) => {
                    return <ShowEducation
                        key={index}
                        id={index}
                        type={itemval.degree_type}
                        degree={itemval.degree}
                        college={itemval.college}
                        yop={itemval.yop}
                        showDeleteBtn={true}
                        onSelect={deleteEducation}
                    />
                })}
                {/* ADDING EDUCATIONAL DETAILS */}
                <AddEducation
                    addEduDetals={addEduDetals}
                    eduDetailsObj={eduDetailsObj}
                    eduChangeHanler={eduChangeHanler}
                />

                {/* PAST PROJECTS */}
                <Heading text="Past Projects" />
                {/* SHOWING PROJECT DETAILS */}
                {projects.length === 0 ? <NoDetails message="No Project Details Provided" /> : projects.map((itemval, index) => {
                    return <ShowProject
                        key={index}
                        id={index}
                        title={itemval.title}
                        type={itemval.project_type}
                        link={itemval.link}
                        description={itemval.description}
                        technologies={itemval.technologies}
                        role={itemval.role}
                        showDeleteBtn={true}
                        onSelect={deleteProject}
                    />
                })}
                {/* ADDING PROJECT DETAILS */}
                <AddProject
                    addProjectDetails={addProjectDetails}
                    projectObj={projectObj}
                    projectChangeHanler={projectChangeHanler}
                    setProjTech={setProjTech}
                    projTech={projTech}
                />

                {/* ACHIEVEMENT */}
                <Heading text="Achievements" />
                {/* SHOWING ACHIEVEMENT DETAILS */}
                {achievements.length === 0 ? <NoDetails message="No Achievement Added" /> : achievements.map((itemval, index) => {
                    return <ShowAchievement
                        key={index}
                        id={index}
                        title={itemval.title}
                        description={itemval.description}
                        document={itemval.document}
                        showDeleteBtn={true}
                        onSelect={deleteAchievement}
                    />
                })}
                {/* ADDING ACHIEVEMENT DETAILS */}
                <AddAchievement
                    addAchievDetails={addAchievDetails}
                    achievObj={achievObj}
                    achievChangeHandler={achievChangeHandler}
                    docUploader={docUploader}
                    selectedFile={selectedFile}
                    // setSelectedFile={setSelectedFile}
                    isDisable={isDisable}
                />

                <Heading text="Social Link" />
                {/* SHOW SOCIAL LINK */}
                <ShowSocialLink
                    socialLink={socialLink}
                    deleteSocialLink={deleteSocialLink}
                />
                {/* SOCIAL LINKS */}
                <AddSocilaLink
                    addSocialLinkIcon={addSocialLinkIcon}
                    socialIconHandler={socialIconHandler}
                    socialLinkObj={socialLinkObj}
                    socialLinkHandler={socialLinkHandler}
                />


                {/* FINAL SAVE BUTTON TO DATABASE */}
                <div className='text-center container pt-5 mb-5 text-end '>
                    <SaveBtn title="Save & Continue" onSelect={saveDetails} />
                </div>

            </div>

        </>
    );
}

export default SetupProfile;