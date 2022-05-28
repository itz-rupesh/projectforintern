import React from "react";
import { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import ShowWorkLocations from "../../setupOrg/ShowWorkLocations";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../../App";


const OrgProfileForUserLocations = () => {
    const navigate = useNavigate();
    const { userState } = useContext(CurrentUserContext);

    // const [current_org_id] = useOutletContext();
    const [locations, setLocations] = useState([]);
    // const org__id = current_org_id;
    const org__id = userState;


    useEffect(() => {
        if (org__id === "") {
            return navigate('/feed');
        }
        axios.get(`/account/feed/orgprofile/locations/${org__id}`, { withCredentials: true })
            .then((res) => {
                setLocations(res.data.locations);
                // console.log(achievements);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);



    return (<ShowWorkLocations
        locations={locations}
        showDeleteBtn={false}
    />
    );
}

export default OrgProfileForUserLocations;
