import React from "react";
import NoMessage from '../../../images/Spinner-black.gif'
const Loading = (props) => {

    return (<>
        <div className="container text-center ">
            <div className="row mt-5">
                <img src={NoMessage} alt="" className="img-fluid m-auto" style={{ maxWidth: "150px", height: "fit-content" }} />
            </div>
        </div>
    </>)
}
export default Loading;