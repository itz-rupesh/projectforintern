import React from "react";

const MessageSend = (props) => {

    const { msg, image } = props;
    return (<>
        <div className="message-container-send ">
            <div className="chat-message text-start d-flex pt-3">
                <img src={image} alt="" className="profile-image-chat-message m-1 mt-0" />
                <span className="message-text-send">  {msg}  </span>
            </div>
        </div>
    </>);
}

export default MessageSend;