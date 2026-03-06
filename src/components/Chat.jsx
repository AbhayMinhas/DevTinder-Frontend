import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text,createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        Id:senderId._id,
        timestamp:createdAt,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  },[]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    //As soon as the page loaded, the socket  connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
    //now the major important step is cleanup
    // whenever this component unloads you need to do cleanup of this event also
    //cannot leave the socket  connection empty
    // this is a performance thing and will result in loose socket connections here and there.
    socket.on("messageReceived", ({ firstName,lastName, text,senderId,timestamp }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text,Id:senderId,timestamp }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-scroll p-5">
        {/* display messages */}
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`chat ${user._id===msg.Id?"chat-end":"chat-start"}`}
            >
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName?msg.lastName:" "}`}
                <time className="text-xs opacity-50">{msg.timestamp}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          className="flex-1 border border-gray-500 text-white rounded p-2 bg-black"
        ></input>
        <button
          onClick={sendMessage}
          className="btn btn-secondary"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
