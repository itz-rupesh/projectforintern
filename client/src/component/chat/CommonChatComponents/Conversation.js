import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
// import ProfilePic from "../../images/profile2.jpg"
import cogoToast from 'cogo-toast';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";
import SendIcon from "@material-ui/icons/Send";

import NoConversation from "./NoConversation";
import MessageSend from "./MessageSend";
import MessageRecieved from "./MessageRecieved";
import { CurrentUserContext } from "../../../App";

import { useNavigate } from "react-router-dom";

const Conversation = (props) => {
    const { dispatchh } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const { onClose, currentConversation, name, email, image, messages, isOrg, current_user_id, sender_id, sender_image, reciever_image, reciever_id, pushNewMessageInChat, setAllMessageSeenByUser } = props;
    const [messages_arr, setMessages_arr] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        setMessages_arr(messages);
        setAllMessageSeenByUser(currentConversation._id, current_user_id, sender_id);

    }, []);

    const sendNewMessage = () => {
        if (newMessage === '') return;
        const API = isOrg ? '/livechat/user/newmessage' : '/livechat/org/newmessage';
        axios.post(API, {
            coversation_id: currentConversation._id,
            reciever: reciever_id,
            msg: newMessage
        }, { withCredentials: true })
            .then((res) => {
                cogoToast.success(res.data.message);
                setMessages_arr([...messages_arr, res.data.newMessage]);
                pushNewMessageInChat(currentConversation._id, res.data.newMessage);
                setNewMessage('');
            }).catch((err) => {
                cogoToast.error(err.response.data.error);
            })
    }

    const el = useRef(null);
    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });

    });

    return (<>
        <div className="container pt-4 mt-5">
            <div className="container chat-container pt-2 ">
                <div className="row">
                    <div className="col-md-12 Chat-Header">
                        <div className="chat-header-row mt-2">
                            <span className="d-flex profile-link-from-chat" onClick={() => { dispatchh({ type: "USER", payload: sender_id }); navigate(isOrg ? '/feed/orgprofile' : '/organization/orgfeed/userprofile') }}>
                                <img src={image} className="profile-image m-2 me-3 ms-3" />
                                <span >
                                    <h6 className="pt-2 mb-0 ">{name.replace(/\b\w/g, l => l.toUpperCase())} {isOrg && <i className="fa-solid fa-circle-check fa-sm text-primary"></i>} </h6>
                                    <span className="contact-item-user-email">{email} </span>
                                </span>
                            </span>
                            <IconButton className="refresh" >
                                <ReplayIcon fontSize="large" />
                            </IconButton>
                            <IconButton className="close"
                                onClick={() => onClose()}
                            >
                                <CloseIcon fontSize="large" />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="  contect-list mt-5 ms-0 pt-3 pb-5 ">
                    {
                        messages_arr.length === 0 ? <NoConversation /> :
                            messages_arr.map((obj, index) => {
                                if (obj.reciever === current_user_id)
                                    return <MessageSend
                                        key={obj._id}
                                        msg={obj.text}
                                        image={sender_image}

                                    />
                                else
                                    return <MessageRecieved
                                        key={obj._id}
                                        msg={obj.text}
                                        image={reciever_image}
                                    />
                            })
                    }

                    <div className="Dummy-Div" id={'el'} ref={el}>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12 Chat-Bottom">
                        <div className="chat-header-row row p-2">
                            <div className="col-10">

                                <textarea type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="form-control type-message-input" placeholder="Type message ..." rows={2} />
                            </div>
                            <div className="col-2 text-center">
                                <IconButton className="send"
                                    onClick={() => sendNewMessage()}
                                >
                                    <SendIcon fontSize="large" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Conversation;