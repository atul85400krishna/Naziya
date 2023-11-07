import { useContext, useEffect, useRef, useState } from "react";
import NavbarUser from "../components/NavbarUser";
import { ChatList, MessageList } from "react-chat-elements";
import sendIcon from "../assets/icons/send.svg";
import arrowLeftIcon from "../assets/icons/arrow-left.svg";
import "./styles/messages.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API, AuthContext } from "../context/AuthContext";
import defaultProfile from "../assets/images/default-profile-image.jpg";
import { GrAttachment } from "react-icons/gr";

const Messages = () => {
  const divRef = useRef(null);
  const divRef2 = useRef(null);
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, getAllChats } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState();
  const [sendMessage, setSendMessage] = useState("");
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [isSelectFile, setIsSelectFile] = useState(false);
  const [result, setResult] = useState("");

  const uploader = async (e, id) => {
    const imageFile = e;

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      console.log(e.target.result);
      const url = "http://52.1.41.162/media/" + e.target.result;
      console.log("first", url);
      setResult(url);
    });

    reader.readAsDataURL(imageFile);

    console.log("firs2", result);
    try {
      const res = await API(
        "post",
        `/users/messages/?chat_id=${id}`,
        { chat_id: id, text: result },
        state.token
      );
      console.log(res);
      setCurrentChatMessages([
        ...currentChatMessages,
        {
          chat: currentChat?.id,
          sender: state?.id,
          text: result,
          created_at: new Date(),
          date: new Date(),
          position: "right",
          title: state?.name,
        },
      ]);
      console.log("opload");
      setSendMessage("");
      getAllChats();
      setIsSelectFile(false);
      setResult("");
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };
  // const [allChats, setAllChats] = useState(state?.allChats || []);

  const getCurrentChatMessages = async (id) => {
    try {
      const res = await API(
        "get",
        `/users/messages/?chat_id=${id}`,
        {},
        state.token
      );
      setCurrentChatMessages(res?.data?.results);
      console.log("msg", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (id) => {
    try {
      const res = await API(
        "post",
        `/users/messages/?chat_id=${id}`,
        { chat_id: id, text: sendMessage },
        state.token
      );
      console.log(res);
      setCurrentChatMessages([
        ...currentChatMessages,
        {
          chat: currentChat?.id,
          sender: state?.id,
          text: sendMessage,
          created_at: new Date(),
          date: new Date(),
          position: "right",
          title: state?.name,
        },
      ]);
      setSendMessage("");
      getAllChats();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (divRef.current) {
      const childDiv = divRef.current.querySelector(".message-list");
      if (childDiv) {
        const grandChildDiv = childDiv.querySelector(".rce-mlist");
        console.log(childDiv);
        if (grandChildDiv) {
          grandChildDiv.scrollTop = grandChildDiv.scrollHeight;
        }
      }
    }
    if (divRef2.current) {
      const childDiv = divRef2.current.querySelector(".message-list");
      if (childDiv) {
        const grandChildDiv = childDiv.querySelector(".rce-mlist");
        if (grandChildDiv) {
          grandChildDiv.scrollTop = grandChildDiv.scrollHeight;
        }
      }
    }
  }, [currentChat, currentChatMessages]);

  useEffect(() => {
    const handleBackButton = (event) => {
      console.log(event);
      if (currentChat) {
        event.preventDefault();
        setCurrentChat(null);
      } else {
        navigate(-1);
      }
    };
    window.onpopstate = handleBackButton;

    return () => {
      window.onpopstate = null;
    };
  }, [currentChat]);

  useEffect(() => {
    if (currentChat?.id) getCurrentChatMessages(currentChat?.id);
  }, [currentChat]);

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    console.log(
      state?.allChats?.find((e) => e.id == searchParams.get("chat_id"))
    );
    if (!currentChat)
      setCurrentChat(
        state?.allChats?.find((e) => e.id == searchParams.get("chat_id"))
      );
  }, [state?.allChats]);

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded); // ADDED
    setIsSelectFile(true);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <NavbarUser />
      <main className="messages__container">
        <div className="chats">
          <ChatList
            className="chat-list"
            onClick={(data) => setCurrentChat(data)}
            dataSource={(state?.allChats || []).map((obj) => ({
              ...obj,
              avatar: obj?.avatar
                ? "http://52.1.41.162/media/" + obj?.avatar
                : defaultProfile,
            }))}
          />
          <div className="chat__search">
            {/* <p className="chat__search-title">Messages</p> */}
            <input type="text" placeholder="Search..." />
            {/* <span>New messages</span> */}
          </div>
        </div>

        {currentChat ? (
          <div
            className="messages_message messages__container--desktop"
            ref={divRef}
          >
            <div className="message__header">
              <img
                src={
                  currentChat.avatar
                    ? currentChat.avatar.slice(0, 4) === "http"
                      ? currentChat.avatar
                      : "http://52.1.41.162/media/" + currentChat.avatar
                    : defaultProfile
                }
                alt=""
                className="message__avatar"
              />
              <div>{currentChat.title}</div>
            </div>
            <MessageList
              className="message-list"
              // lockable={true}
              // toBottomHeight={"100%"}
              onTitleClick={(e) => {
                if (e?.sender == state?.id) {
                  navigate("/profile");
                } else {
                  console.log("navigate to company profile");
                }
              }}
              dataSource={currentChatMessages.map((obj) => {
                console.log("onjjjn", obj);
                return {
                  ...obj,
                  type: "text",
                };
              })}
            />
            <div className="messages__input">
              {/* <input
                type="text"
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(currentChat?.id);
                  }
                }}
                placeholder="Your message...                               "
              /> */}

              {/* Sahmeer's code */}
              {isSelectFile ? (
                <div style={{ flex: 1, paddingLeft: 10, marginTop: 10 }}>
                  <h5 style={{ fontSize: 14 }}>{file?.name}</h5>
                </div>
              ) : (
                <input
                  type="text"
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(currentChat?.id);
                    }
                  }}
                  placeholder="Your message...                               "
                />
              )}
              <div onClick={handleClick} className="messages__send1">
                <input
                  onChange={handleChange}
                  type="file"
                  className="InputFile"
                  ref={hiddenFileInput}
                />
                <GrAttachment
                  style={{ color: "white" }}
                  color="white"
                  className="icon"
                  size={20}
                />
              </div>
              <button
                className="messages__send"
                onClick={() => handleSendMessage(currentChat?.id)}
              >
                <img src={sendIcon} alt="send" />
              </button>
            </div>
          </div>
        ) : (
          <div className="message__unselected">
            Select a chat to start messaging
          </div>
        )}
        {currentChat && (
          <div
            className="messages_message messages__container--mobile"
            ref={divRef2}
            // style={{ height: "calc(100vh - 3.4rem)", overflowY: "scroll" }}
          >
            <div className="message__header">
              <button onClick={() => setCurrentChat(null)}>
                <img src={arrowLeftIcon} alt="" />
              </button>
              <img
                src={currentChat.avatar ? currentChat.avatar : defaultProfile}
                alt=""
                className="message__avatar"
              />
              <div>{currentChat.title}</div>
            </div>
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              // dataSource={[
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              //   {
              //     position: "left",
              //     type: "text",
              //     title: "Kursat",
              //     text: "Give me a message list example !",
              //   },
              //   {
              //     position: "right",
              //     type: "text",
              //     title: "Emre",
              //     text: "That's all.",
              //   },
              // ]}
              onTitleClick={(e) => {
                if (e?.sender == state?.id) {
                  navigate("/profile");
                } else {
                  console.log("navigate to company profile");
                }
              }}
              dataSource={currentChatMessages.map((obj) => ({
                ...obj,
                type: "text",
              }))}
            />
            <div className="messages__input">
              {/* <input
                type="text"
                name=""
                id=""
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(currentChat?.id);
                  }
                }}
                placeholder="Your message...                               "
              /> */}
              {isSelectFile ? (
                <div style={{ flex: 1, paddingLeft: 10, marginTop: 10 }}>
                  <h5 style={{ fontSize: 14 }}>{file?.name}</h5>
                </div>
              ) : (
                <input
                  type="text"
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(currentChat?.id);
                    }
                  }}
                  placeholder="Your message...                               "
                />
              )}
              <div onClick={handleClick} className="messages__send1">
                <input
                  onChange={handleChange}
                  type="file"
                  className="InputFile"
                  ref={hiddenFileInput}
                />
                <GrAttachment
                  style={{ color: "white" }}
                  color="white"
                  className="icon"
                  size={20}
                />
              </div>
              <button
                className="messages__send"
                onClick={() =>
                  isSelectFile
                    ? uploader(file, currentChat?.id)
                    : handleSendMessage(currentChat?.id)
                }
              >
                <img src={sendIcon} alt="send" />
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Messages;

{
  /* <MessageList
  className="message-list"
  dataSource={currentChatMessages.map((message) => {
    if (message.type === 'text') {
      return {
        text: message.text,
        type: 'text',
      };
    } else if (message.type === 'photo') {
      return {
        image: { src: message.url, alt: 'Image' },
        type: 'photo',
      };
    } else if (message.type === 'video') {
      return {
        video: {
          src: message.url,
          poster: message.poster,
        },
        type: 'video',
      };
    }
    return null; // Handle other message types as needed
  })}
  onTitleClick={(e) => {
    if (e?.sender === state?.id) {
      navigate('/profile');
    } else {
      console.log('navigate to company profile');
    }
  }}
/> */
}
