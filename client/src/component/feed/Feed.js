import React from "react";
import TinderCard from "react-tinder-card";
import { useState, useEffect } from "react";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';
import './Feed.css';
import Header from "./Header";
import Footer from "./Footer";
// import ShowOrgProjects from "../orgdashboard/ShowOrgProjects";
import ProjectCard from "./ProjectCard";
// import CloseIcon from "@material-ui/icons/Close";
// import IconButton from "@material-ui/core/IconButton";

// import { SwipeableDrawer } from "@material-ui/core";
// import { FavoriteOutlined } from "@material-ui/icons";

export const favi = [];
export let current = { project_id: '', org_id: '' };   //current card org-id for organization profile
const Feed = () => {
    const navigate = useNavigate();
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

    const [showFullCard, setShowFullCard] = useState(false);
    const [currentProject, setCurrentProjet] = useState({});
    const [fav, setFav] = useState([]);
    const [liveProjects, setLiveProjects] = useState([]);
    const setView = (_id) => {
        setCurrentProjet(liveProjects.find((obj) => {
            return obj._id === _id;
        }));

        setShowFullCard(!showFullCard);
    }

    useEffect(() => {
        axios.get('/account/feed/liveprojects', { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setLiveProjects(res.data);
                // console.log(liveProjects);
            }).catch((err) => {
                console.log(err.response.data.error);
            })
    }, []);

    // set current card org-id
    useEffect(() => {
        current.org_id = liveProjects[liveProjects.length - 1]?.organization_id?._id;
        current.project_id = liveProjects[liveProjects.length - 1]?._id;
        // console.log(current);
    }, [liveProjects])

    const Swiped = (direction, index, _id, k) => {

        if (direction === "right") {
            axios.post('/account/feed/liveprojects/rightswipe', {
                project_id: _id
            }, { withCredentials: true }).then((res) => {
                cogoToast.success(res.data.message);
                favi.push(k);
                // console.log(fav);
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
            })

        }
        if (direction === "left") {
            axios.post('/account/feed/liveprojects/leftswipe', {
                project_id: _id
            }, { withCredentials: true }).then((res) => {
                cogoToast.success(res.data.message);
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
            })

        }

    };
    const outOfFrame = (_id) => {
        // console.log(name + ' left the screen!');
        setLiveProjects((liveProjects) => {
            return liveProjects.filter((obj, index) => {
                return obj._id !== _id;
            })
        })
        // remove this record from liveprojects state using filter
    }



    return (<>
        {/* showing full project information */}
        {showFullCard && liveProjects.length !== 0 && <div className="project-fullView-card-container">
            <div className="container project-fullView-card-container-inner">
                <ProjectCard
                    project={currentProject}
                    onSelect={setShowFullCard}
                    showFullCard={showFullCard}
                    ShowCloseButton={true}
                />
            </div>
        </div>
        }

        <Header
            dashboard="/dashboard"
            chat="/user/chat"
        />

        <div className="container-fluid">
            <div className="body_container">
                {!showFullCard ? liveProjects.map((k, index) => <TinderCard
                    className="swipe"
                    key={k._id}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => Swiped(dir, index, k._id, k)
                    }


                    onCardLeftScreen={() => outOfFrame(k._id)}
                >
                    <div className="card-tinder" >
                        <ProjectCard
                            key={k._id}
                            project={k}
                            onSelect={setView}
                            showFullCard={showFullCard}
                            showFullCardButton={true}
                            ShowCloseButton={true}
                        />
                    </div>
                </TinderCard>
                ) : ""}
            </div>

        </div>
        <Footer
            // for full view
            setView={setView}
            current={current}
            // org profile url for user/student
            orgProfileUrlForUser={liveProjects.length !== 0 ? "/feed/orgprofile" : ""}
            //fav projects url
            favProjectUrl="/feed/fav"
            matchedUrl="/feed/matched"
            current_project_id={current.project_id}
            isUserFeed={true}


        />
    </>
    )
}
export default Feed;