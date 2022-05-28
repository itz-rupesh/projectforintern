import React from "react";


const ContectListItem = (props) => {

    const { conversation_id, name, email, image, onSelect, unseen_msg, last_msg, isOrg } = props;
    return (<>
        <div className="contact-list-item m-2 p-2" onClick={() => onSelect(conversation_id)}>
            <img src={image} className="profile-image m-2 me-3" />
            <span >
                <h6 className="pt-2 ">{name.replace(/\b\w/g, l => l.toUpperCase())} {isOrg ? <i className="fa-solid fa-circle-check fa-sm text-primary"></i> : <span className="contact-item-user-email">● {email} </span>}</h6>
                <p className="last-message pb-0 mb-0">{last_msg?.split(/\s+/).slice(0, 6).join(" ")} ...</p>
            </span>
            {unseen_msg !== 0 && <span className="unseen-msg-count ">{unseen_msg}</span>}
        </div>
    </>)
}
export default ContectListItem;