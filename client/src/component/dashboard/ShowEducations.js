import React, { useEffect, useState } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import ShowEducation from '../setupProfile/ShowEducation';
import NoDetails from "../setupProfile/Nodetails";
const ShowEducations = (props) => {
    const [education, setEducation] = useState([]);
    useEffect(() => {
        axios.get('/account/info/education', { withCredentials: true })
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

export default ShowEducations;