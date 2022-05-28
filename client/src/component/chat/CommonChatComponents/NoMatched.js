import React from "react";
import NoMessage from '../../../images/no-message.PNG'
const NoMatched = (props) => {

    return (<>
        <div className="container text-center ">
            <div className="row mt-5">
                <img src={NoMessage} alt="" className="img-fluid m-auto" style={{ maxWidth: "400px", height: "fit-content" }} />
                <h5 className="text-secondary pt-4">No messages yet!!</h5>
                <p className="text-secondary pt-2 m-auto" style={{ maxWidth: "400px", fontSize: "small" }}> {props.message} </p>
            </div>
        </div>
    </>)
}
export default NoMatched;