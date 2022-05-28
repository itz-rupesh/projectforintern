import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';
import '../feed/Feed.css';
import UserProfileCard from "./UserProfileCard";


const MatchedProfiles = () => {
    const navigate = useNavigate();
    const showSetupProfile = () => {                  // USER AUTHENTICATION 
        axios.get('/org/verify', { withCredentials: true })
            .then((res) => {
            }).catch((err) => {
                cogoToast.error("Session expire, Please login again");
                navigate('/organization/login/signin');
            })
    }
    useEffect(() => {
        showSetupProfile();
    }, []);
    const [posts, setPosts] = useState([]);
    useEffect(() => {

        axios.get('/org/feed/liveprojects/matched', { withCredentials: true })
            .then((res) => {
                const tempArray = [];
                res.data.map((obj, index) => {
                    obj.matched.map((user, ind) => {
                        tempArray.push({
                            project: obj,
                            user: user
                        });
                    })
                })
                setPosts(tempArray);

            }).catch((err) => {
                console.log(err);

            })
    }, []);




    return (
        <>
        <div className="container mt-5 pt-3 ps-5 pe-5 ">
            {posts.map((k, index) => <div key={k.project._id + k.user.userID._id} className="container-fluid text-white pt-2 pb-3 ">
                <div className="body_container bg-black p-3 " style={{ borderRadius: "15px" }}>
                    <UserProfileCard
                        key={k.project._id + k.user.userID._id}
                        post={k}
                        showFullCardButton={false}
                        ShowCloseButton={false}
                        showFullCard={false}
                    />
                </div>
            </div>
            )}
        </div>
    </>

    );
}

export default MatchedProfiles;
