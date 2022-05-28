import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import ShowOrgRating from "./ShowOrgRatings";
import NoDetails from "../setupProfile/Nodetails";
const OrgRating = () => {

    const [rating, setRating] = useState([]);
    useEffect(() => {
        axios.get('/org/info/rating', { withCredentials: true })
            .then((res) => {
                setRating(res.data.rating);
            }).catch((err) => {

            })
    }, []);

    return (<>
        {
            rating.length === 0 ?
                <NoDetails
                    message="No Rating addded"
                /> :
                rating.map((obj, index) => {
                    return <ShowOrgRating
                        key={obj._id}
                        index={index}
                        rating={obj}
                    />
                })
        }
    </>

    )
}
export default OrgRating;