import React from "react";

const SaveBtn = (props) => {
    return (
        <>
            <button className="save-btn" onClick={() => props.onSelect()} >{props.title} <i className="fas fa-arrow-circle-right fa-1x"></i></button>
        </>
    );
}
const AddWithClickBtn = (props) => {
    return (
        <>
            <button className="save-btn" onClick={() => props.onSelect()}>{props.title}</button>
        </>
    );
}
export default SaveBtn;
export { AddWithClickBtn };