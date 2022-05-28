import React from "react";
import ReactTooltip from 'react-tooltip';

const ShowProject = (props) => {

    return (
        <>
            <div className='container-fluid text-white ps-5 pe-5 pb-5 mt-2 mb-2' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                <div className='container-row text-end pt-4' >
                    {(!props.link) ? '' : <a style={{ color: "#a7a7a7" }} href={props.link} target="_blank" data-tip="Project Link" data-for='link'>
                        <i className="fas fa-external-link-alt fa-lg "></i></a>}
                    <ReactTooltip id="link" place="top" type="info" effect="solid" />
                    {(props.showDeleteBtn) ? <> &nbsp; &nbsp; <i data-tip="Delete Project" data-for='delete' className="fas fa-trash-alt fa-lg" onClick={() => props.onSelect(props.id)}></i> </> : ''}
                    <ReactTooltip place="top" id='delete' type="error" effect="solid" />
                </div>
                <div className='container-row pt-5'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6 text-capitalize pb-4'>
                            <HR title="Project Title " />
                            <div>
                                <h4>{props.title} </h4>

                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6 pb-4'>
                            <HR title="Project Type " />
                            <h4>{props.type}</h4>
                        </div>
                    </div>
                </div>
                <div className='container-row '>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6 col-xl-6 text-justify pt-3 pb-4'>
                            <HR title="Project Technologies" />
                            <div>
                                {props.technologies.map((tag, index) => {
                                    return <ProjTech
                                        key={index}
                                        index={index}
                                        tag={tag}
                                    />
                                }
                                )}
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-xl-6 pt-3 pb-4'>
                            <HR title="Project Role" />
                            <h4>{props.role}</h4>
                        </div>
                    </div>
                </div>

                <div className='container-row '>
                    <div className='row text-justify '>
                        <div className='col-12 text-justify' >
                            <HR title="Project Description" />
                            <p>{props.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const ProjTech = (props) => {
    return (<button key={props.index}
        className=" m-1 text-capitalize projTechTag">
        {props.tag}
    </button>
    );
}


const HR = (props) => {
    return (<>
        <div className="hr-title-div">
            <p className="title-upon-hr mb-0">{props.title}</p>
            <hr className="hr-below-titte mt-1" />
        </div>
    </>);
}

export { ShowProject, HR, ProjTech };