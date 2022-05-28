import React from "react";
import ShowAchievement from '../../setupProfile/ShowAchievement';
import NoDetails from '../../setupProfile/Nodetails';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../../App";


const OrgProfileForUserAchievements = () => {
    const navigate = useNavigate();
    const { userState } = useContext(CurrentUserContext);
    // const [current_org_id] = useOutletContext();
    const [achievements, setachievements] = useState([]);
    // const org__id = current_org_id;
    const org__id = userState;


    useEffect(() => {
        if (org__id === "") {
            return navigate('/feed');
        }
        axios.get(`/account/feed/orgprofile/achievements/${org__id}`, { withCredentials: true })
            .then((res) => {
                setachievements(res.data.achievements);
                // console.log(achievements);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);



    return (<>
        {achievements.length === 0 ? <NoDetails message="No Achievement Added" /> : achievements.map((itemval, index) => {
            return <ShowAchievement
                key={index}
                id={index}
                title={itemval.title}
                description={itemval.description}
                document={itemval.document}
                showDeleteBtn={false}
            />
        })}

    </>
    );
}

export default OrgProfileForUserAchievements;
