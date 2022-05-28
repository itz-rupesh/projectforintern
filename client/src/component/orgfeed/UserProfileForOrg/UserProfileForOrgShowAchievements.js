import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
// import cogoToast from "cogo-toast";
import NoDetails from "../../setupProfile/Nodetails";
import ShowAchievement from "../../setupProfile/ShowAchievement";
// import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../../App";

const UserProfileForOrgShowAchievements = (props) => {

    const navigate = useNavigate();
    const { userState } = useContext(CurrentUserContext);
    // const [current_org_id] = useOutletContext();
    const current_org_id = userState;
    const [achievements, setachievements] = useState([]);
    useEffect(() => {
        if (current_org_id === "") {
            return navigate('/organization/orgfeed');
        }
        axios.get(`/org/feed/userprofile/achievements/${current_org_id}`, { withCredentials: true })
            .then((res) => {
                setachievements(res.data.achievements);
                // console.log(achievements);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);
    return (
        <>
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

export default UserProfileForOrgShowAchievements;