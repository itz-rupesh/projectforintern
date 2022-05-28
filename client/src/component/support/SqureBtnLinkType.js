
import './SqureBtnLinkType.css';
import React from 'react';
import { Link } from 'react-router-dom';
const SqureBtnLinkType = (props) => {
    return (
        <>
            <div className='col-12 col-lg-5 mt-4' >

                <Link to={props.link} className="">
                    <button className="ellips-btn">{props.title} <i className="fas fa-arrow-circle-right fa-1x"></i></button>
                </Link>
            </div>
        </>
    );
}

export default SqureBtnLinkType;