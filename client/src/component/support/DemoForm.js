
import { useState } from "react";
import axios from "axios";
const DemoForm = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const changeHandler = (e) => {
        
        let inputname = e.target.name;
        let value = e.target.value;
        setFormValues({ ...formValues, [inputname]: value });
        

    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('/account/login',formValues).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        setFormValues({email:'',password:''});
    }
    return (
        <div className="container pt-5 mt-5">
            <form onSubmit={submitHandler}>
                <div className="form-floating form-white mb-5">
                    <input type="email" className="form-control" id="email" placeholder="Enter email" autoComplete="off" name="email" value={formValues.email} onChange={changeHandler} />
                    <label className="form-label text-dark" htmlFor="email">Email</label>
                </div>
                <div className="form-floating form-white mb-5">
                    <input type="password" className="form-control" id="password" placeholder="Enter password" autoComplete="off" name="password" value={formValues.password} onChange={changeHandler} />
                    <label className="form-label text-dark" htmlFor="password">Password</label>
                </div>
                <button >Submit</button>
            </form>
        </div>
    )
}

export default DemoForm;