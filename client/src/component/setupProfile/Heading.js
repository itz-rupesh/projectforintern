import React from "react";


const Heading = (props) => {
    return (
        <div className='text-center container pt-5'>
            <h1 className='m-25'>{props.text}</h1>
            <hr />
        </div>
    );
}


export default Heading;