import React, { useEffect, useState } from "react";
import axios from "axios";
// import cogoToast from "cogo-toast";
import NoDetails from "../setupProfile/Nodetails";
import ShowAchievement from "../setupProfile/ShowAchievement";
const ShowAchievements = (props) => {
    const [achievements, setachievements] = useState([]);
    useEffect(() => {
        axios.get('/account/info/achievements', { withCredentials: true })
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

export default ShowAchievements;