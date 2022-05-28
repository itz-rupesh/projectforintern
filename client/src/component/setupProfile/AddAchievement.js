import React from "react";
import AddButton from '../support/SquareBtn';


const AddAchievement = (props) => {
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mt-5' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <form onSubmit={props.addAchievDetails}>
                <div className='container-row'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <div>
                                <label className='form-label pt-4'>Title <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                                <input type="text" className='form-control' name='title' value={props.achievObj.title} onChange={props.achievChangeHandler} placeholder='Enter title' required />
                            </div>
                            <div>
                                <label htmlFor="formFile" className="form-label pt-4">supportive document (if any)</label>
                                {/* <input className="form-control" type="file" id="formFile" name='document' onChange={props.docUploader} required /> */}
                                <input className="form-control" type="file" id="formFile" name='document' onChange={props.docUploader} />
                                <div className="pt-2 text-end">
                                    <a href={props.selectedFile.fileUrl} target="_blank">{props.selectedFile.filename}</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Description <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <textarea className='form-control' name='description' value={props.achievObj.description} onChange={props.achievChangeHandler} placeholder='Add description here' rows="5" required />
                        </div>
                    </div>
                </div>

                <div className='container-row'>
                    <div className='col-12 pt-4 text-end'>
                        <AddButton title="Add Details" isDisable={props.isDisable} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddAchievement;