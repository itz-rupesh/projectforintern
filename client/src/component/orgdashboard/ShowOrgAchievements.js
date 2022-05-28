import React from "react";
import ShowAchievement from '../setupProfile/ShowAchievement';
import NoDetails from '../setupProfile/Nodetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ShowOrgAchievements = () => {

    const [achievements, setachievements] = useState([]);
    useEffect(() => {
        axios.get('/org/info/achievements', { withCredentials: true })
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

export default ShowOrgAchievements;
