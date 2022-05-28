import React from "react";
import { AddWithClickBtn } from "../../support/SaveBtn";
import CancelBtn from "../../support/CancelBtn";
import ReactStarsRating from 'react-awesome-stars-rating';
import ReactTagInput from "@pathofdev/react-tag-input";
import Spinner from '../../../images/Spinner.gif';


const UserProfileForOrgAddRating = (props) => {

    const {
        starChangeHandler,
        cancel,
        saveRating,
        InputChangeHandler,
        newRating,
        tech,
        setTech,
        uploadCertificate,
        isUploading,
        uploadedFileDetails
    } = props;
    return (<>
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mb-4 mt-4' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            {/* <form onSubmit={props.addLiveProject}> */}
            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Star Rating <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <div className=" text-center">
                            <ReactStarsRating onChange={starChangeHandler} value={newRating.star} isEdit={true} isHalf={true} count={5} size={40} starGap={15} id="starRatingInput_" />
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Performance <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <select className="form-select" name='performance' value={newRating.performance} onChange={InputChangeHandler} aria-label="Select-Type" required >
                            <option value='' disabled defaultValue>Select performance</option>
                            <option value='' disabled defaultValue>Select experience</option>
                            <option value="expert">expert</option>
                            <option value="excellent">excellent</option>
                            <option value="awesome">awesome</option>
                            <option value="very good">very good</option>
                            <option value="good">good</option>
                            <option value="appreciable">appreciable</option>
                            <option value="trustworthy">trustworthy</option>
                            <option value="bad">bad</option>
                            <option value="very bad">very bad</option>
                            <option value="disappointing">disappointing</option>
                            <option value="undeserving">undeserving</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Start date <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <div className="text-md-start text-center">
                            <input type="date" className='form-control' name='start_date' value={newRating.start_date} onChange={InputChangeHandler} placeholder='DD/MM/YYYY' />
                        </div>
                    </div>
                    <div className='col-6 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>End date <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <div className="text-md-start text-center">
                            <input type="date" className='form-control' name='end_date' value={newRating.end_date} onChange={InputChangeHandler} placeholder='DD/MM/YYYY' />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Role/task <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <input type="text" className='form-control' name='role' value={newRating.role} onChange={InputChangeHandler} placeholder='enter role' />
                    </div>
                    <div className='col-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>upload certificate </label>
                        <input type="file" className='form-control' name='certificate' onChange={uploadCertificate} />
                        <div className='col-12 col-md-12 m-0 p-0 mt-2 text-end '>
                            {isUploading ? <img src={Spinner} alt="uploading ..." style={{ width: "50px", height: "50px" }} /> :
                                <a href={uploadedFileDetails?.url} target="_blank">{uploadedFileDetails?.name}</a>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-row'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Technologies <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <ReactTagInput
                            className="form-control"
                            tags={tech}
                            editable={false}
                            placeholder="Type and press enter"
                            removeOnBackspace={true}
                            onChange={(newTags) => setTech(newTags)}
                        />
                    </div>
                    <div className='col-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Feedback <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <textarea className='form-control' name='feedback' value={newRating.feedback} onChange={InputChangeHandler} placeholder='Enter your feedback' required rows={2} />
                    </div>
                </div>
                <div className='col-12 pt-4 text-end'>
                    {/* <AddButton title="Add" /> */}
                    <CancelBtn title="cancel" onSelect={cancel} />
                    <AddWithClickBtn title="Add" onSelect={saveRating} />
                    {/* <button onClick={props.addProjectDetails}></button> */}
                </div>
            </div>
            {/* </form> */}
        </div>
    </>);
}

export default UserProfileForOrgAddRating;




