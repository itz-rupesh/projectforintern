import React from "react";

const AddNewEntryButton = (props) => {
    return (
        <>
            <div className='container-fluid p-2 mt-3 mb-3 text-center add-project-btn' style={{ borderRadius: "10px" }} onClick={() => props.onSelect()} >
                <i className="fa-solid fa-circle-plus fa-2x "></i>
            </div>
        </>
    )
}


export default AddNewEntryButton;