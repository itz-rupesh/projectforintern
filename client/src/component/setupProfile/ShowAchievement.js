import React from 'react'
import { HR } from './ShowProject';
import ReactTooltip from 'react-tooltip';

const ShowAchievement = (props) => {

    return (
        <>
            <div className='container-fluid text-white ps-5 pe-5 pb-5 mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                <div className='container-row text-end pt-4' >
                    {(!props.document) ? '' : <a style={{ color: "#a7a7a7" }} href={props.document} target="_blank" data-tip="Certificate" data-for='link'>
                        <i className="fas fa-external-link-alt fa-lg "></i></a>}
                    <ReactTooltip id="link" place="top" type="info" effect="solid" />
                    {(props.showDeleteBtn) ? <> &nbsp; &nbsp;<i data-tip="Delete Record" data-for='delete' className="fas fa-trash-alt fa-lg" onClick={() => props.onSelect(props.id)}></i> </> : ''}
                    <ReactTooltip place="top" id='delete' type="error" effect="solid" />
                </div>
                <div className='container-row pt-5'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-8 col-xl-8 text-capitalize pb-4'>
                            <HR title="Title" />
                            <div>
                                <h4>{props.title}  </h4>
                            </div>
                        </div>
                        {/* <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                        <HR title="document"/>
                        <a href={props.document}>docs</a>
                    </div> */}
                    </div>
                </div>

                <div className='container-row '>
                    <div className='row text-justify '>
                        <div className='col-12 text-justify' >
                            <HR title="Description" />
                            <p>{props.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// {(!props.link)?'':<a style={{color:"#a7a7a7"}} href={props.link} ><i className="fas fa-external-link-alt"></i></a>}
export default ShowAchievement;