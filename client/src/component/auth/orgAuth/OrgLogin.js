import React, { useState, useContext } from "react";
import '../Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { NavbarContext } from '../../../App';

const OrgLogin = () => {
    const { state, dispatch } = useContext(NavbarContext);
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({
        text: "Please enter your login and password!",
        color: "white"
    });

    const ChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        cogoToast.loading(" Processing !!");
        axios.post('/org/login', formValues)
            .then(res => {
                setMessage({ text: res.data.message, color: "green" });
                cogoToast.success(res.data.message);
                dispatch({ type: "ORGANIZATION", payload: { image: res.data.image, name: res.data.name } });
                navigate('/organization/dashboard');

            }).catch(err => {
                setMessage({ text: err.response.data.error, color: "red" });
                cogoToast.error(err.response.data.error, { position: 'top-center', heading: 'Error' });
            });
        setFormValues({ email: '', password: '' });

    }

    return (
        <>
            <div className="skewed fixed-top">
            </div>
            <div className="container py-5 h-100 mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-3">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="mb-5" style={{ color: message.color }}>{message.text}</p>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-floating form-white mb-5">
                                            <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="off" name="email" value={formValues.email} onChange={ChangeHandler} required />
                                            <label className="form-label text-dark" htmlFor="email">Email</label>
                                        </div>
                                        <div className="form-floating form-white mb-5">
                                            <input type="password" className="form-control" id="password" placeholder="Enter password" autoComplete="off" name="password" value={formValues.password} onChange={ChangeHandler} required />
                                            <label className="form-label text-dark" htmlFor="password">Password</label>
                                        </div>
                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#">Forgot password?</a></p>
                                        <button className="btn btn-outline-primary btn-lg px-5" type="submit">Login</button>
                                    </form>
                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-0">Don't have an account? <Link to="/organization/login/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}




const OrgSignup = () => {
    const { state, dispatch } = useContext(NavbarContext);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState({
        text: "Create new acoount !",
        color: "white"
    });

    const ChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        cogoToast.loading(" Processing !!");
        axios.post('/org/signup', formValues)
            .then(res => {
                cogoToast.success(res.data.message);
                setMessage({ text: res.data.message, color: "green" });
                dispatch({ type: "ORGANIZATION", payload: { image: res.data.image, name: res.data.name } });
                navigate('/organization/setup');
            }).catch(err => {
                cogoToast.error(err.response.data.error, { position: 'top-center', heading: 'Error' });
                setMessage({ text: err.response.data.error, color: "red" });
            });
        setFormValues({ name: '', email: '', password: '' });
    }
    return (
        <>
            <div className="skewed fixed-top">
            </div>
            <div className="container py-5 h-100 mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-3">
                                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                                    <p className=" mb-5" style={{ color: message.color }}>{message.text}</p>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-floating form-white mb-5">
                                            <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" autoComplete="off" value={formValues.name} onChange={ChangeHandler} required />
                                            <label className="form-label text-dark" htmlFor="name">Company Name</label>
                                        </div>

                                        <div className="form-floating form-white mb-5">
                                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" autoComplete="off" value={formValues.email} onChange={ChangeHandler} required />
                                            <label className="form-label text-dark" htmlFor="email">Email</label>
                                        </div>
                                        <div className="form-floating form-white mb-5">
                                            <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" autoComplete="off" value={formValues.password} onChange={ChangeHandler} required />
                                            <label className="form-label text-dark" htmlFor="password">Password</label>
                                        </div>
                                        <button className="btn btn-outline-primary btn-lg px-5" type="submit">Sign Up</button>
                                    </form>
                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-0">Already have an account? <Link to="/organization/login/signin" className="text-white-50 fw-bold">Sign In</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export { OrgLogin, OrgSignup };