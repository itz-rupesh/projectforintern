import React, { useEffect, useState } from "react";
import axios from "axios";
import NoDetails from "../setupProfile/Nodetails";
import ShowRating from "../dashboard/ShowRating";

const ShowUserRating = () => {

    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        axios.get(`/account/info/rating`, { withCredentials: true })
            .then((res) => {

                const tempRatings = res.data.rating;
                setRatings(tempRating => {
                    const ratingsToSort = tempRatings;
                    ratingsToSort.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? +1 : 0));
                    return ratingsToSort;
                })
            }).catch((err) => {

            })
    }, []);
    return (<>
        {ratings.length === 0 ? <NoDetails message="No Ratings Added" /> : ratings.map((rating, index) => {
            return <ShowRating
                key={rating._id}
                id={index}
                rating={rating}
            />
        })}
    </>)
}
export default ShowUserRating;
