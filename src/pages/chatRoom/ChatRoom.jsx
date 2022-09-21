import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import IncomingMessages from "../../components/incomingMessages/IncomingMessages.component";
import OutgoingMessages from "../../components/outgoingMessages/OutgoingMessages.component";

import { useSelector, useDispatch } from "react-redux";
import { getUserName } from "../../redux/userSlice";
import { getAllChats, addChat, getIncomingCount } from "../../redux/chatsSlice";
import { useNavigate } from "react-router";

const ChatRoom = ({ channel, pageRef }) => {
  // const pageRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(getUserName);
  const allChats = useSelector(getAllChats);
  const incomingCount = useSelector(getIncomingCount);
  const incomingCountRef = useRef(0);
  console.log({ allChats });
  const [chatLength, setChatLength] = useState(
    allChats?.length > 25 ? 25 : allChats.length === 0 ? 0 : allChats.length
  );

  const [loading, setLoading] = useState(false); //**toggle loading state when fetching chat history */
  // const loadingRef = useRef(null);

  const [message, setMessage] = useState(""); //* message input for user */

  //** confirm if user is logged in */
  useEffect(() => {
    if (!currentUser || currentUser === "") {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  console.log({ incomingCount });

  //** increment chat length by one on receiving message */
  useEffect(() => {
    if (incomingCount !== incomingCountRef.current) {
      setChatLength((prevLength) => prevLength + 1);
    }
  }, [incomingCount]);

  //** submit button handler */
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: v4(),
      userName: currentUser,
      message,
    };

    // console.log(data);

    setChatLength((prevLength) => prevLength + 1); //** increment chatLength by one */
    dispatch(addChat(data)); //** dispatch message to redux */

    //** post message to all listening tabs */
    channel.postMessage(data);
    setMessage("");
    console.log(pageRef.current?.scrollHeight);
    setTimeout(
      () => (pageRef.current.scrollTop = pageRef.current?.scrollHeight),
      100
    );
  };

  //** load chat history */
  const chatHistory = async (e) => {
    e.preventDefault();
    setLoading(true); //** insert loading message */

    console.log("scrolling");
    console.log(e.target.scrollTop);
    if (e.target.scrollTop > 0 || e.target.scrollTop < 0) {
      setLoading(false);
      return;
    }
    if (allChats.length <= 25) {
      setLoading(false);
      return;
    }
    if (chatLength >= allChats.length) {
      setLoading(false);
      return;
    }
    console.log("setting 3");
    setChatLength((prev) => prev + 25);

    // loadingRef.current?.scrollTo(0, 0);

    setTimeout(() => setLoading(false), 100); //** remove loading message */
  };

  // console.log({ chatLength });
  console.log(
    "array length",
    "\n",
    "all chats length",
    allChats.length,
    "\n",
    "difference",
    allChats.length - chatLength,
    "\n",
    "chatLength",
    chatLength
  );

  useEffect(() => {
    pageRef.current.scrollTop = pageRef.current.scrollHeight;
  }, [pageRef]);

  return (
    <div className="w-screen h-screen flex flex-col justify-between gap-4">
      <div className="w-full h-4 bg-gradient-to-r from-violet-700 to-fuchsia-700"></div>

      <section
        onScroll={chatHistory}
        ref={pageRef}
        className="grow flex flex-col gap-8 px-4 overflow-y-scroll"
      >
        <div>{loading && "Loading..."}</div>
        {allChats.length > 0 &&
          allChats
            .slice(allChats.length - chatLength, allChats.length)
            ?.map((chat) => {
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
