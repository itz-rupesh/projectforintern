import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import SaveBtn from '../support/SaveBtn';
import cogoToast from 'cogo-toast';
import "@pathofdev/react-tag-input/build/index.css";
import Heading from '../setupProfile/Heading';
// import AddButton from '../support/SquareBtn';
import { useNavigate } from 'react-router-dom';

import Technologies from './Technologies';
import About from './About';
import { ShowSocialLink } from '../setupProfile/ShowSocialLink';
import AddSocilaLink from '../setupProfile/AddSocialLink';
import AddWorkLocations from './AddWorkLocations';
import ShowWorkLocations from './ShowWorkLocations';
import ShowAchievement from '../setupProfile/ShowAchievement';
import AddAchievement from '../setupProfile/AddAchievement';
import NoDetails from '../setupProfile/Nodetails';
import UploadDoc from './UploadDoc';
import { NavbarContext } from '../../App';

const SetupOrganization = () => {
    const { dispatch } = useContext(NavbarContext);
    const navigate = useNavigate();
    const [technologies, setTechnologies] = useState([]);

    const [about, setabout] = useState('');
    const aboutChangeHandler = (e) => {
        setabout(e.target.value);
    }
    // document/ file uploading 
    const [document, setDocument] = useState({
        logo: '',
        cover: '',
        supportiveDoc: ''
    })
    const [logo, setLogo] = useState({
        fileName: '',
        url: ''
    });
    const [cover, setCover] = useState({
        fileName: '',
        url: ''
    });
    const [supportiveDoc, setSupportiveDoc] = useState({
        fileName: '',
        url: ''
    });
    const [fileLoading, setFileLoading] = useState({
        supportiveDoc: false,
        logo: false,
        cover: false
    });

    const documentChangeHandler = (e) => {
        console.log(e.target.files[0]);
        const formData = new FormData();
        // document.body.style.cursor = 'wait';
        setFileLoading({ ...fileLoading, [e.target.name]: true });
        formData.append('postDoc', e.target.files[0]);
        axios.post('/document/org/uploader', formData, { withCredentials: true })
            .then((res) => {

                cogoToast.success(res.data.message);
                let tempUrl = res.data.url;
                switch (e.target.name) {
                    case "supportiveDoc":
                        setSupportiveDoc({ fileName: e.target.files[0].name, url: tempUrl });
                        setDocument({ ...document, [e.target.name]: tempUrl });
                        break;
                    case "logo":
                        setLogo({ fileName: e.target.files[0].name, url: tempUrl });
                        setDocument({ ...document, [e.target.name]: tempUrl });
                        break;
                    case "cover":
                        setCover({ fileName: e.target.files[0].name, url: tempUrl });
                        setDocument({ ...document, [e.target.name]: tempUrl });
                        break;
                }
                setFileLoading({ ...fileLoading, [e.target.name]: false });

            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                setFileLoading({ ...fileLoading, [e.target.name]: false });

            })

    }

    // ACHIEVEMENTS START
    const [achievements, setAchievements] = useState([]);
    const [achievObj, setAchievObj] = useState({
        title: '',
        document: '',
        description: '',
    })
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
    const [selectedFile, setSelectedFile] = useState({
        filename: '',
        fileUrl: ''
    });
    const [isDisable, setIsDisable] = useState(false);
    const docUploader = (e) => {

        setIsDisable(true);
        const formData = new FormData();
        formData.append('postDoc', e.target.files[0]);
        axios.post('/document/org/uploader', formData, { withCredentials: true }).then((res) => {
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


    // ACHIEVEMENTS END

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
    // LOCATION START
    const [locations, setLocations] = useState([]);
    const [location, setlocation] = useState({
        city: '',
        address: ''
    });
    const locationChangeHandler = (e) => {
        setlocation({ ...location, [e.target.name]: e.target.value });
    }
    const addLocation = (e) => {
        e.preventDefault();
        setLocations([...locations, location]);
        setlocation({ city: '', address: '' });
        // console.log(locations);
    }
    const deleteLocation = (id) => {
        setLocations((locations) => {
            return locations.filter((arrElem, index) => {
                return index !== id;
            })
        })
    }
    // LOCATION END
    // SAVE DETAILS INTO DATAABSE
    const saveDetails = (e) => {
        if (technologies.length === 0) return cogoToast.error("please enter technologies!");
        if (about === '') return cogoToast.error("please fill about field!");
        if (socialLink.length === 0) return cogoToast.error("please enter at least two social links!");
        if (locations.length === 0) return cogoToast.error("please enter work locations!");
        const details = {
            technologies: technologies,
            about: about,
            documents: document,
            socialLinks: socialLink,
            locations: locations,
            achievements: achievements
        }
        axios.post('/org/setup', details, { withCredentials: true })
            .then((res) => {
                cogoToast.success(res.data.message);
                dispatch({ type: "ORGANIZATION", payload: { image: res.data.image, name: res.data.name } });
                navigate('/organization/dashboard');
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
            })
    }



    const showSetupOrganization = () => {                  // USER AUTHENTICATION 
        axios.get('/org/verify', { withCredentials: true })
            .then((res) => {
            }).catch((err) => {
                cogoToast.error("Session expire, Please login again");
                navigate('/organization/login/signin');
            })
    }
    useEffect(() => {
        showSetupOrganization();
    }, []);

    return (
        <>
            <div className='container mt-5'>
                {/* COMPANY TECHNOLOGIES */}
                <Heading text="Technologies" />
                <Technologies
                    technologies={technologies}
                    setTechnologies={setTechnologies}
                />

                {/* ABOUT COMPANY */}
                <Heading text="About Company" />
                <About
                    about={about}
                    aboutChangeHandler={aboutChangeHandler}
                />

                {/* IMAGES */}
                <UploadDoc
                    documentChangeHandler={documentChangeHandler}
                    logo={logo}
                    cover={cover}
                    supportiveDoc={supportiveDoc}
                    fileLoading={fileLoading}
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
                <Heading text=" Work Locations" />
                {/* SHOW LOCATION */}
                <ShowWorkLocations
                    locations={locations}
                    deleteLocation={deleteLocation}
                    showDeleteBtn={true}
                />
                {/* ADD LOCATION */}
                <AddWorkLocations
                    addLocation={addLocation}
                    location={location}
                    locationChangeHandler={locationChangeHandler}
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

                <div className='text-center container pt-5 mb-5 text-end '>
                    <SaveBtn title="Save & Continue" onSelect={saveDetails} />
                </div>
            </div>
        </>
    );
}






export default SetupOrganization;


