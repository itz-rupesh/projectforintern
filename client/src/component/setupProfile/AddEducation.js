import React from "react";
import AddButton from '../support/SquareBtn';

const AddEducation = (props) => {
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mt-5' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <form onSubmit={props.addEduDetals}>
                <div className='container-row'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Select Degree Type <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <select className="form-select" name='degree_type' value={props.eduDetailsObj.degree_type} onChange={props.eduChangeHanler} aria-label="Select-Type" required >
                                <option value='' disabled defaultValue>Select Degree Type</option>
                                <option value="Post-Graduate">Post-Graduate</option>
                                <option value="Under-Graduate">Under-Graduate</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Name of Degree <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input type="text" className='form-control' name='degree' value={props.eduDetailsObj.degree} onChange={props.eduChangeHanler} placeholder='Enter degree name' required />
                        </div>
                    </div>
                </div>

                <div className='container-row'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>College / University Name <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input type="text" className='form-control' name='college' value={props.eduDetailsObj.college} onChange={props.eduChangeHanler} placeholder='Enter College name' required />
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Year of Passing <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input type="month" className='form-control' name='yop' value={props.eduDetailsObj.yop} onChange={props.eduChangeHanler} placeholder='Enter year of passing' required />
                        </div>
                    </div>
                    <div className='col-12 pt-4 text-end'>
                        <AddButton title="Add Details" />
                    </div>
                </div>
            </form>
        </div>

    );
}

export default AddEducation;