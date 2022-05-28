import React from "react";
import './CancelBtn.css'

const CancelBtn = (props) => {
    return (
        <>
            <button className="cancel-btn ms-3 me-3" onClick={() => props.onSelect()}>{props.title}</button>
        </>
    );
}

export default CancelBtn;