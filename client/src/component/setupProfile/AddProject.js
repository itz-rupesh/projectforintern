import React from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import AddButton from '../support/SquareBtn';

const AddProject = (props) => {
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mt-5' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <form onSubmit={props.addProjectDetails}>
            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Project Title <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <input type="text" className='form-control' name='title' value={props.projectObj.title} onChange={props.projectChangeHanler} placeholder='Enter project title' required />
                    </div>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Project link (Optional) </label>
                        <input type="url" className='form-control' name='link' value={props.projectObj.link} onChange={props.projectChangeHanler} placeholder='http://www.example.com' />
                    </div>
                </div>
            </div>

            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Project Type <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <select className="form-select" name='project_type' value={props.projectObj.project_type} onChange={props.projectChangeHanler} aria-label="Select-Type" required >
                            <option value='' disabled defaultValue>Select project type</option>
                            <option value="Individual project">Individual project</option>
                            <option value="Group project">Group project</option>
                            <option value="College project">College project</option>
                            <option value="Internship project">Internship project</option>
                        </select>
                    </div>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Role in Project <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <input type="text" className='form-control' name='role' value={props.projectObj.role} onChange={props.projectChangeHanler} placeholder='Enter Role' required />
                    </div>
                </div>
            </div>

            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label  pt-4'>Technologies Used <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
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
                        <textarea className='form-control' name='description' value={props.projectObj.description} onChange={props.projectChangeHanler} placeholder='Describe your project' required />
                    </div>
                </div>
                <div className='col-12 pt-4 text-end'>
                    <AddButton title="Add Project" />
                    {/* <button onClick={props.addProjectDetails}></button> */}
                </div>
            </div>
            </form>
        </div>
    );
}

export default AddProject;