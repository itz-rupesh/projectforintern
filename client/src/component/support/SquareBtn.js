import React from "react";
import './SquareBtn.css';

const SquareBtn = (props) => {
    return (
        <button className="square-btn" type="submit" disabled={props.isDisable}><span> {props.title}</span></button>
    );
}
export default SquareBtn;