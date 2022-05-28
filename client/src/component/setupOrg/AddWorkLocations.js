import React from 'react';
import "@pathofdev/react-tag-input/build/index.css";
import AddButton from '../support/SquareBtn';

const AddWorkLocations = (props) => {
    const { addLocation, location, locationChangeHandler } = props;
    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mt-3' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <form onSubmit={addLocation}>
                <div className='container-row'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>city <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input type="text" className='form-control' name='city' value={location.city} onChange={locationChangeHandler} placeholder='Enter city' required />
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6'>
                            <label className='form-label pt-4'>Year of Passing <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input type="text" className='form-control' name='address' value={location.address} onChange={locationChangeHandler} placeholder='Enter Address' required />
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

export default AddWorkLocations;