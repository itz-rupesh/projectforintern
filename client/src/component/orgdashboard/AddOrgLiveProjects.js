import React from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
// import AddButton from '../support/SquareBtn';
// import AddSkills from "../setupProfile/AddSkills";
// import SaveBtn from "../support/SaveBtn";
import { AddWithClickBtn } from "../support/SaveBtn";
import CancelBtn from "../support/CancelBtn";
const AddOrgLiveProject = (props) => {
    const {
        title,
        start_date,
        memebers_required,
        description,
        role,
        work_type,
        location,
        compensation
    } = props.project;
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mb-4 mt-4' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            {/* <form onSubmit={props.addLiveProject}> */}
            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Project Title <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <input type="text" className='form-control' name='title' value={title} onChange={props.projectChangeHanler} placeholder='Enter project title' required />
                    </div>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Role <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <input type="text" className='form-control' name='role' value={role} onChange={props.projectChangeHanler} placeholder='Enter role' required />
                    </div>
                </div>
            </div>

            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Work Type <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <select className="form-select" name='work_type' value={work_type} onChange={props.projectChangeHanler} aria-label="Select-Type" required >
                            <option value='' disabled defaultValue>Select work type</option>
                            <option value="Work from home (part time)">Work from home (part time)</option>
                            <option value="Work from home (full time)">Work from home (full time)</option>
                            <option value="office work (part time)">office work (part time)</option>
                            <option value="office work (full time)">office work (full time)</option>
                        </select>
                    </div>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Compensation <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <select className="form-select" name='compensation' value={compensation} onChange={props.projectChangeHanler} aria-label="Select-Type" required >
                            <option value='' disabled defaultValue>Select compensation</option>
                            <option value="rating only">rating only</option>
                            <option value="certificate + rating"> certificate + rating</option>
                            <option value="paid + rating">paid + rating</option>
                            <option value="paid + certificate + rating"> paid + certificate + rating</option>
                            <option value="paid + certificate + rating + PPO"> paid + certificate + rating + PPO </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Work Location (if any)</label>
                        <input type="text" className='form-control' name='location' value={location} onChange={props.projectChangeHanler} placeholder='Enter city' />
                    </div>
                    <div className='col-sm-12 col-md-3 col-xl-3'>
                        <label className='form-label pt-4'>Work Start day <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <input type="date" className='form-control' name='start_date' value={start_date} onChange={props.projectChangeHanler} placeholder='DD/MM/YYYY' />
                    </div>
                    <div className='col-sm-12 col-md-3 col-xl-3'>
                        <label className='form-label pt-4'>Memebers Requirement <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <input type="number" className='form-control' name='memebers_required' value={memebers_required} onChange={props.projectChangeHanler} placeholder='Enter required members' required />
                    </div>
                </div>
            </div>
            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label  pt-4'>Skills Required <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <ReactTagInput
                            className="form-control"
                            tags={props.projTech}
                            editable={true}
                            placeholder="Type and press enter"
                            removeOnBackspace={true}
                            onChange={(newTags) => props.setProjTech(newTags)}
                        />

                    </div>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Project Description <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <textarea className='form-control' name='description' value={description} onChange={props.projectChangeHanler} placeholder='Describe your project' required />
                    </div>
                </div>
                <div className='col-12 pt-4 text-end'>
                    {/* <AddButton title="Add" /> */}
                    <CancelBtn title="cancel" onSelect={props.cancel} />

                    <AddWithClickBtn title="Add" onSelect={props.addLiveProject} />
                    {/* <button onClick={props.addProjectDetails}></button> */}
                </div>
            </div>
            {/* </form> */}
        </div>
    );
}



export default AddOrgLiveProject;