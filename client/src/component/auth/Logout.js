import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarContext } from '../../App';

const Logout = () => {
    const { state, dispatch } = useContext(NavbarContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/account/logout', { withCredentials: true })
            .then((res) => {
                dispatch({ type: "UNAUTHORIZED", payload: false });
                cogoToast.success(res.data.message);
                // navigate('/home');
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
                // navigate('/home');
            })
    },[]);


    return (
        <>
            <div className="pt-5 mt-5 text-center">
                <h1>Logout successful !</h1>
                <Link to='/home' >Go back to the home page</Link>
            </div>
        </>
    );
}

export default Logout;