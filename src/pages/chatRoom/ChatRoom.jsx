import React, { useState } from "react";
import { v4 } from "uuid";
import IncomingMessages from "../../components/incomingMessages/IncomingMessages.component";
import OutgoingMessages from "../../components/outgoingMessages/OutgoingMessages.component";

import { useSelector, useDispatch } from "react-redux";
import { getUserName } from "../../redux/userSlice";
import { getAllChats, addChat } from "../../redux/chatsSlice";

const ChatRoom = ({ channel }) => {
  //** subscribe to channel */
  //   const channel = new BroadcastChannel("app-data");

  const dispatch = useDispatch();
  const currentUser = useSelector(getUserName);
  const allChats = useSelector(getAllChats);

  const [message, setMessage] = useState("");

  console.log({ currentUser });
  console.log({ allChats });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: v4(),
      userName: currentUser,
      message,
    };

    console.log(data);
    dispatch(addChat(data));
    //** post message to all listening tabs */
    channel.postMessage(data);
    setMessage("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between gap-4">
      <div className="w-full h-4 bg-gradient-to-r from-violet-700 to-fuchsia-700"></div>
      <section className="grow flex flex-col gap-8 px-4 overflow-y-scroll">
        {allChats.length > 0 &&
          allChats.map((chat) => {
            if (chat.userName === currentUser) {
              return <OutgoingMessages key={chat.id} chat={chat} />;
            } else return <IncomingMessages key={chat.id} chat={chat} />;
          })}
      </section>
      <form className="w-full py-4 px-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 flex gap-2">
        <input
          type="text"
          className="rounded-3xl grow py-2 px-8"
          placeholder="type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="text-gray-600 text-sm font-semibold rounded-3xl py-2 px-8 bg-white "
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
