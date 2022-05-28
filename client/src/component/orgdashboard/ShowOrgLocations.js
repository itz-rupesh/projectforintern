import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowWorkLocations from "../setupOrg/ShowWorkLocations";
const ShowOrgLocations = () => {

    const [locations, setLocations] = useState([]);
    useEffect(() => {
        axios.get('/org/info/locations', { withCredentials: true })
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

export default ShowOrgLocations;
