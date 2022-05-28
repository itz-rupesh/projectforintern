import React from "react";
import ReactTagInput from "@pathofdev/react-tag-input";     // IMPORTING tag input JS

const AddSkills = (props) => {
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-5' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <div className='container-row'>
                <label className='form-label  pt-4'>Enter Skill Set <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                <ReactTagInput
                    className="form-control"
                    tags={props.skills}
                    editable={true}
                    placeholder="Type and press enter"
                    removeOnBackspace={true}
                    onChange={(newTags) => props.setSkills(newTags)}
                />
            </div>
            <div className='container-row'>
                <div className='row'>
                    <div className='col-12'>
                        <label className='form-label pt-4'>Select Profession <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <select className="form-select" name='profession' value={props.profession.profession} onChange={props.professionChangeHandler} aria-label="Select Profession" required>
                            <option value='' disabled defaultValue>Select Profession</option>
                            <option value="Student">Student</option>
                            <option value="Professional">Professional</option>
                            <option value="Freelincer">Freelincer</option>
                        </select>
                    </div>
                    {/* <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>year of experience (if any)</label>
                        <input type="number" min="0" className='form-control' name='yoe' value={props.profession.yoe} onChange={props.professionChangeHandler} placeholder='Enter Year of experience' disabled={props.disableExp} />
                    </div> */}
                </div>
            </div>
        </div>
    );
}


export default AddSkills;