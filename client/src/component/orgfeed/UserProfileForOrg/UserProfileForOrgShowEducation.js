import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import ShowEducation from '../../setupProfile/ShowEducation';
import NoDetails from "../../setupProfile/Nodetails";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../../App";

const UserProfileForOrgShowEducation = (props) => {
    const navigate = useNavigate();
    const { userState } = useContext(CurrentUserContext);
    // const [current_org_id] = useOutletContext();
    const current_org_id = userState;
    const [education, setEducation] = useState([]);
    useEffect(() => {
        if (current_org_id === "") {
            return navigate('/organization/orgfeed');
        }
        axios.get(`/org/feed/userprofile/education/${current_org_id}`, { withCredentials: true })
            .then((res) => {
                setEducation(res.data.education);
                // console.log(education);
            }).catch((err) => {
                // cogoToast.error(err.response.data.error);
            })
    }, []);
    return (
        <>
            {education.length === 0 ? <NoDetails message="No Education Details Provided" /> : education.map((itemval, index) => {
                return <ShowEducation
                    key={index}
                    id={index}
                    type={itemval.degree_type}
                    degree={itemval.degree}
                    college={itemval.college}
                    yop={new Date(itemval.yop).toLocaleDateString('en-us', { year: "numeric", month: "short" })}
                    showDeleteBtn={false}

                />
            })}

        </>
    );
}

export default UserProfileForOrgShowEducation;