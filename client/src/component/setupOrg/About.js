import React from 'react';

const About = (props) => {
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-5' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <div className='container-row'>
                <div className='row'>
                    <div className='col-12 text-justify'>
                        <label className='form-label pt-4'>About Company <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <textarea className='form-control' name='about' value={props.about} onChange={props.aboutChangeHandler} placeholder='Write here' required />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;