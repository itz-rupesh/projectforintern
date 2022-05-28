import React from "react";
import Spinner from '../../images/Spinner.gif';
const UploadDoc = (props) => {

    return (
        <div className='container-fluid text-white ps-5 pe-5 pb-4 mt-5' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
            <div className='container-row pt-4 p-md-3 '>
                <form >
                    <div className='row'>
                        <div className='col-12 col-md-10 '>
                            <label htmlFor="supportiveDoc" className="form-label pt-2 pt-md-4">supportive document for verification <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input className="form-control" type="file" id="supportiveDoc" name='supportiveDoc' onChange={props.documentChangeHandler} />
                        </div>
                        <div className='col-12 col-md-2 p-3 m-0 pt-md-1 mt-md-5 text-end '>
                            {props.fileLoading.supportiveDoc ? <img src={Spinner} alt="uploading ..." style={{ width: "50px", height: "50px" }} /> :
                                <a href={props?.supportiveDoc?.url} target="_blank">{props?.supportiveDoc?.fileName}</a>
                            }
                        </div>
                    </div>
                </form>
                <form >
                    <div className='row'>
                        <div className='col-12 col-md-10 '>
                            <label htmlFor="logo" className="form-label pt-2 pt-md-4">Company icon <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input className="form-control" type="file" id="logo" name='logo' onChange={props.documentChangeHandler} />
                        </div>
                        <div className='col-12 col-md-2 p-3 m-0 pt-md-1 mt-md-5 text-end'>
                            {props.fileLoading.logo ? <img src={Spinner} alt="uploading ..." style={{ width: "50px", height: "50px" }} /> :
                                <a href={props?.logo?.url} target="_blank">{props?.logo?.fileName}</a>
                            }
                        </div>
                    </div>
                </form>
                <form >
                    <div className='row'>
                        <div className='col-12 col-md-10 '>
                            <label htmlFor="cover" className="form-label pt-2 pt-md-4">Cover image <i class="fa-solid fa-star-of-life text-danger fa-xs"></i></label>
                            <input className="form-control" type="file" id="cover" name='cover' onChange={props.documentChangeHandler} />
                        </div>
                        <div className='col-12 col-md-2 p-3 m-0 pt-md-1 mt-md-5 text-end '>
                            {props.fileLoading.cover ? <img src={Spinner} alt="uploading ..." style={{ width: "50px", height: "50px" }} /> :
                                <a href={props?.cover?.url} target="_blank">{props?.cover?.fileName}</a>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UploadDoc;