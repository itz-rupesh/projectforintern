import React from "react";
import { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ShowOrgRating from "../../orgdashboard/ShowOrgRatings";
import AddNewEntryButton from "../../orgdashboard/AddNewEntryButton";
import cogoToast from "cogo-toast";
import AddRatingForOrg from "./AddRatingForOrg";
import NoDetails from "../../setupProfile/Nodetails";
import { CurrentUserContext } from "../../../App";


const OrgProfileForUserRating = () => {
    const { userState } = useContext(CurrentUserContext);

    const navigate = useNavigate();
    // const [current_org_id] = useOutletContext();
    // const org__id = current_org_id;
    const org__id = userState;
    const [rating, setRating] = useState([]);
    const [addRatingButton, setAddRatingButton] = useState(true);
    const changeButtonState = () => {
        setAddRatingButton((addRatingButton) => !addRatingButton);
    }
    const [ratingObject, setRatingObject] = useState({
        experience: '',
        feedback: '',
        star: 0
    });

    const ratingChangeHandler = (e) => {
        setRatingObject({ ...ratingObject, [e.target.name]: e.target.value });
    }

    const cancel = () => {
        setRatingObject({ experience: '', feedback: '', star: 0 });
        setAddRatingButton((addRatingButton) => !addRatingButton);
    }

    const starChangeHandler = (value) => {
        setRatingObject({ ...ratingObject, star: value })
    }

    const saveRating = (e) => {
        if (ratingObject.star === 0) return cogoToast.error("plase give star");
        if (ratingObject.experience === '') return cogoToast.error("plase select experience");
        if (ratingObject.feedback === '') return cogoToast.error("plase enter your feedback");
        axios.post(`/account/feed/orgprofile/addrating/${org__id}`, ratingObject, { withCredentials: true })
            .then((res) => {
                cogoToast.success(res.data.message);
                setRating([...rating, res.data.newRating]);
                setRating((rating) => {
                    const result = rating;
                    result.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? +1 : 0));
                    return result;
                })
                cancel();

            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                // cancel();
            });
    }
    useEffect(() => {
        if (org__id === "") {
            return navigate('/feed');
        }
        axios.get(`/account/feed/orgprofile/rating/${org__id}`, { withCredentials: true })
            .then((res) => {
                const result = res.data.rating;
                result.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? +1 : 0));
                setRating(result);
                // console.log(res.data.rating);
                // console.log(rating);
                // console.log(achievements);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);

    return (<>
        {
            addRatingButton ?
                <AddNewEntryButton
                    message="Add Rating"
                    onSelect={changeButtonState}
                /> :
                <AddRatingForOrg
                    ratingObject={ratingObject}
                    starChangeHandler={starChangeHandler}
                    cancel={cancel}
                    saveRating={saveRating}
                    ratingChangeHandler={ratingChangeHandler}
                />
        }
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

    );
}

export default OrgProfileForUserRating;