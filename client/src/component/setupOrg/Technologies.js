import React from 'react';
import ReactTagInput from "@pathofdev/react-tag-input";


const Technologies = (props) => {
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-5' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <div className='container-row'>
                <label className='form-label  pt-4'>Enter technologies <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                <ReactTagInput
                    className="form-control"
                    tags={props.technologies}
                    editable={false}
                    placeholder="Type and press enter"
                    removeOnBackspace={true}
                    onChange={(newTags) => props.setTechnologies(newTags)}
                />
            </div>
        </div>
    );
}


export default Technologies;