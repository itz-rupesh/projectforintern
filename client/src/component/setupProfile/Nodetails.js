import React from "react";

const NoDetails = (props) => {
    return (
        <>
            <div className='container-fluid text-white p-3 mt-2 mb-2 text-center' style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                {props.message}
            </div>
        </>
    );
}
export default NoDetails;