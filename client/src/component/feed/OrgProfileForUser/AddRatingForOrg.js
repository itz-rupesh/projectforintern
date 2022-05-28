import React from "react";
import { AddWithClickBtn } from "../../support/SaveBtn";
import CancelBtn from "../../support/CancelBtn";
import ReactStarsRating from 'react-awesome-stars-rating';

const AddRatingForOrg = (props) => {
    const { ratingObject,
        starChangeHandler,
        cancel,
        saveRating,
        ratingChangeHandler,
    } = props;
    return (<>
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mb-4 mt-4' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            {/* <form onSubmit={props.addLiveProject}> */}
            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Star Rating <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <div className="text-md-start text-center">
                            <ReactStarsRating onChange={starChangeHandler} value={ratingObject.star} isEdit={true} isHalf={true} count={5} size={40} starGap={20} id="starRatingInput" />
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-xl-6'>
                        <label className='form-label pt-4'>Experience <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <select className="form-select" name='experience' value={ratingObject.experience} onChange={ratingChangeHandler} aria-label="Select-Type" required >
                            <option value='' disabled defaultValue>Select experience</option>
                            <option value="expert">expert</option>
                            <option value="excellent">excellent</option>
                            <option value="awesome">awesome</option>
                            <option value="very good">very good</option>
                            <option value="good">good</option>
                            <option value="appreciable">appreciable</option>
                            <option value="bad">bad</option>
                            <option value="very bad">very bad</option>
                            <option value="disappointing">disappointing</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='container-row'>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-xl-12'>
                        <label className='form-label pt-4'>Feedback <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                        <textarea className='form-control' name='feedback' value={ratingObject.feedback} onChange={ratingChangeHandler} placeholder='Enter your feedback with this organization' required rows={3} />
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

export default AddRatingForOrg;




