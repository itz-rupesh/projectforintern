import React from 'react';
import ReactTooltip from 'react-tooltip';
import NoDetails from '../setupProfile/Nodetails';
const ShowWorkLocations = (props) => {

    const { locations, deleteLocation, showDeleteBtn } = props;
    return (<>
        {
            locations.length === 0 ? <NoDetails message="No Location Added !" /> :
                <div className='container-fluid text-white p-2 mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                    <div className='container-row pt-3 pb-3 ps-0 pe-0 ps-md-5 pe-md-5 mb-2'>
                        <div className='row text-center col-12 m-auto'>
                            {
                                locations.map((obj, index) => {
                                    return (
                                        <ShowAddress
                                            index={index}
                                            key={index}
                                            obj={obj}
                                            onSelect={deleteLocation}
                                            showDeleteBtn={showDeleteBtn}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
        }
    </>
    );
}


const ShowAddress = (props) => {
    const { index, obj, onSelect, showDeleteBtn } = props;
    return (<div key={index} className="col-12 row pt-3" >
        <hr />
        <div className='col-11 text-start text-sm' >
            <i className="fas fa-map-marker-alt text-primary"></i> &nbsp;<small>{obj.city.toUpperCase()},&nbsp; {obj.address}</small>
        </div>
        <div className='col-1'>
            {showDeleteBtn ? <> <i data-tip="Delete location" data-for='delete' className="fas fa-trash-alt fa-lg" onClick={() => onSelect(index)}></i>
                <ReactTooltip place="top" id='delete' type="error" effect="solid" />
            </> : ''}
        </div>
    </div>
    );
}

export default ShowWorkLocations;