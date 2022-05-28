import React from "react";

const MessageRecieved = (props) => {

    const { msg, image } = props;
    return (<>
        <div className="message-container-recieved ">
            <div className="chat-message  d-flex pt-3">
                <span className="message-text-recieved"> {msg} </span>
                <img src={image} alt="" className="profile-image-chat-message m-1 mt-0" />
            </div>
        </div>
    </>);
}

export default MessageRecieved;