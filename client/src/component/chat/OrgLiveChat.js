import React, { useEffect, useState } from "react";
import axios from "axios";
import './LiveChat.css';
import { useNavigate } from 'react-router-dom';
import cogoToast from "cogo-toast";


import Conversation from './CommonChatComponents/Conversation';
import SearchBar from "./CommonChatComponents/SearchBar";
import ContectListItem from "./CommonChatComponents/ContectListItem";
import NoMatched from "./CommonChatComponents/NoMatched";
import Loading from "./CommonChatComponents/Loading";

const OrgLiveChat = () => {
    const navigate = useNavigate();
    const showSetupProfile = () => {                  // ORG AUTHENTICATION 
        axios.get('/org/verify', { withCredentials: true })
            .then((res) => {
            }).catch((err) => {
                cogoToast.error("Session expire, Please login again");
                navigate('/login/signin');
            })
    }
    useEffect(() => {
        showSetupProfile();
    }, []);

    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState([]);
    const [openChat, setOpenChat] = useState(false);
    const chatToggler = () => {
        setOpenChat((openChat) => !openChat);
    }
    const [currentConversation, setCurrentConversation] = useState({});

    const openCoversation = (conversation_id) => {
        setCurrentConversation(chat.find((obj) => obj._id === conversation_id));
        setOpenChat(true);
    }
    const pushNewMessageInChat = (conv_id, newmessage) => {
        chat.map((obj, index) => {
            if (obj._id === conv_id) {
                return obj.messages.push(newmessage);
            }
        });
    }
    const setAllMessageSeenByUser = (conv_id, current_user_id, sender_id) => {

        // make database changes here 
        axios.post('/livechat/org/setseen', {
            conversation_id: conv_id,
            sender: sender_id
        }, { withCredentials: true }).then((res) => {
            // cogoToast.success(res.data.message);
            chat.map((obj, index) => {
                if (obj._id === conv_id) {
                    return obj.messages.map((msg, index) => {
                        if (msg.sender !== current_user_id)
                            return msg.seen = true;
                    })
                }
            });
        }).catch((err) => {
            // cogoToast.error(err.response.data.error
        });


    }


    useEffect(() => {
        axios.get('/livechat/org/getchat', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setChat(() => {
                    const toBeSort = res.data;
                    toBeSort.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0)
                    return toBeSort;
                });
                setLoading(false);
            }).catch((err) => {
                console.log(err.response.data.error);
            })
    }, []);

    // chat contact search functionality
    const [chatSearchResults, setChatSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const SearchChangeHandler = (e) => {
        // console.log(e.target.value)
        setSearchInput(e.target.value);
        if (searchInput !== "") {
            const searchResult = chat.filter((contact) => {
                return [contact.user_name, contact.user_email]
                    .join(" ")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            })
            setChatSearchResults(searchResult);
        } else {
            setChatSearchResults(chat);
        }
    }


    return (<>
        {
            openChat ?
                <Conversation
                    onClose={chatToggler}
                    currentConversation={currentConversation}
                    name={currentConversation.user_name}
                    email={currentConversation.user_email}
                    image={currentConversation.user_image}
                    messages={currentConversation.messages}
                    isOrg={false}
                    current_user_id={currentConversation.organization}
                    sender_id={currentConversation.user}
                    reciever_id={currentConversation.user}
                    sender_image={currentConversation.user_image}
                    reciever_image={currentConversation.org_image}
                    pushNewMessageInChat={pushNewMessageInChat}
                    setAllMessageSeenByUser={setAllMessageSeenByUser}
                /> : <ChatContact
                    searchInput={searchInput}
                    SearchChangeHandler={SearchChangeHandler}
                    onSelect={openCoversation}
                    chat={searchInput.length > 1 ? chatSearchResults : chat}
                    loading={loading}
                />
        }
    </>);
}




const ChatContact = (props) => {
    const { chat, onSelect, loading, searchInput, SearchChangeHandler } = props;
    // count unseen msg for current user 
    const countUnSeenMsg = (messages_arr, current_user) => {
        let initialValue = 0;
        return messages_arr.reduce((previousValue, currentValue) => {
            // console.log("previousValue", previousValue, currentValue);
            if (currentValue.sender !== current_user && !currentValue.seen)
                return previousValue + 1;
            else
                return previousValue;
        }, initialValue);

    }
    return (<>
        <div className="container pt-4 mt-5">
            <div className="container chat-container pt-2 ">
                <SearchBar
                    searchInput={searchInput}
                    SearchChangeHandler={SearchChangeHandler}
                />
                <div className="  contect-list mt-5 ms-0 pt-3">
                    {
                        loading ? <Loading /> : chat.length === 0 ? <NoMatched
                            message="Your chat will be enabled automatically when your project matches with any user profile."
                        /> :
                            chat.map((obj, index) => {
                                return <ContectListItem
                                    key={obj._id}
                                    conversation_id={obj._id}
                                    name={obj.user_name}
                                    image={obj.user_image}
                                    email={obj.user_email}
                                    onSelect={onSelect}
                                    unseen_msg={countUnSeenMsg(obj.messages, obj.organization)}
                                    last_msg={obj.messages[obj.messages.length - 1]?.text}
                                    isOrg={false}
                                />
                            })
                    }

                </div>
            </div>
        </div>
    </>);
}


export default OrgLiveChat;
