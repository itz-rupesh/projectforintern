import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import NoDetails from "../../setupProfile/Nodetails";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import UserProfileForOrgAddRating from "./UserProfileForOrgAddRating";
import AddNewEntryButton from "../../orgdashboard/AddNewEntryButton";
import ShowRating from "../../dashboard/ShowRating";
import { CurrentUserContext } from "../../../App";

const UserProfileForOrgRating = () => {
    const { userState } = useContext(CurrentUserContext);

    const navigate = useNavigate();
    // const [current_user_id] = useOutletContext();
    const current_user_id = userState;
    const [addRatingButton, setAddRatingButton] = useState(true);
    const changeButtonState = () => {
        setAddRatingButton((addRatingButton) => !addRatingButton);
    }
    const [ratings, setRatings] = useState([]);
    const [newRating, setNewRating] = useState({
        star: 0,
        performance: '',
        start_date: '',
        end_date: '',
        role: '',
        certificate: '',
        technologies: [],
        feedback: '',
    });

    const [tech, setTech] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFileDetails, setUploadedFileDetails] = useState({
        name: '',
        url: ''
    })

    const InputChangeHandler = (e) => {
        setNewRating({ ...newRating, [e.target.name]: e.target.value });
    }
    const cancel = () => {
        setNewRating({
            star: 0,
            performance: '',
            start_date: '',
            end_date: '',
            role: '',
            certificate: '',
            technologies: [],
            feedback: '',
        });
        setTech([]);
        setAddRatingButton((addRatingButton) => !addRatingButton);
        setUploadedFileDetails({ name: '', url: '' });
    }
    const uploadCertificate = (e) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('postDoc', e.target.files[0]);
        axios.post('/document/org/uploader', formData, { withCredentials: true }).then((res) => {
            console.log(res.data.url);
            setNewRating({ ...newRating, certificate: res.data.url });
            setUploadedFileDetails({ name: e.target.files[0].name, url: res.data.url });
            cogoToast.success(res.data.message);
            setIsUploading(false);
            e.target.value = '';
        }).catch((err) => {
            cogoToast.error(err.response.data.error);
            setIsUploading(false);
            e.target.value = '';
        })
    }

    const starChangeHandler = (value) => {
        setNewRating({ ...newRating, star: value })
    }

    useEffect(() => {
        if (current_user_id === "") {
            return navigate('/organization/orgfeed');
        }
        axios.get(`/org/feed/userprofile/rating/${current_user_id}`, { withCredentials: true })
            .then((res) => {
                // setRatings(res.data.rating);
                const tempRatings = res.data.rating;
                setRatings(tempRating => {
                    const ratingsToSort = tempRatings;
                    ratingsToSort.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? +1 : 0));
                    return ratingsToSort;
                })
                // console.log(achievements);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);

    const saveRating = () => {
        console.log(newRating);

        // setNewRating({ ...newRating, technologies: tech });
        tech.map((t, ind) => newRating.technologies.push(t));
        if (newRating.star === '') return cogoToast.error("please add star");
        if (newRating.performance === '') return cogoToast.error("please select perfomance");
        if (newRating.start_date === '') return cogoToast.error("please select start date");
        if (newRating.end_date === '') return cogoToast.error("please select end date");
        if (newRating.role === '') return cogoToast.error("please enter role");
        if (newRating.technologies.length === 0) return cogoToast.error("please enter technologies");
        if (newRating.feedback === '') return cogoToast.error("plase enter your feedback");
        axios.post(`/org/feed/userprofile/addrating/${current_user_id}`, { newRating }, { withCredentials: true })
            .then((res) => {
                cogoToast.success(res.data.message);
                setRatings([...ratings, res.data.newRating]);
                setRatings(ratings => {
                    const ratingsToSort = ratings;
                    ratingsToSort.sort((a, b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? +1 : 0));
                    return ratingsToSort;
                })
                cancel();
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
            });

    }

    return (
        <>
            {
                addRatingButton ?
                    <AddNewEntryButton
                        message="Add Rating"
                        onSelect={changeButtonState}
                    /> :
                    <UserProfileForOrgAddRating
                        InputChangeHandler={InputChangeHandler}
                        newRating={newRating}
                        starChangeHandler={starChangeHandler}
                        cancel={cancel}
                        tech={tech}
                        setTech={setTech}
                        saveRating={saveRating}
                        uploadCertificate={uploadCertificate}
                        isUploading={isUploading}
                        uploadedFileDetails={uploadedFileDetails}
                    />
            }

            {ratings.length === 0 ? <NoDetails message="No Ratings Added" /> : ratings.map((rating, index) => {
                return <ShowRating
                    key={rating._id}
                    id={index}
                    rating={rating}
                />
            })}

        </>
    );
}

export default UserProfileForOrgRating;