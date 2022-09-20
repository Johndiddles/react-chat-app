import React from "react";
import IncomingMessages from "../../components/incomingMessages/IncomingMessages.component";
import OutgoingMessages from "../../components/outgoingMessages/OutgoingMessages.component";

const ChatRoom = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between gap-4">
      <div className="w-full h-4 bg-gradient-to-r from-violet-700 to-fuchsia-700"></div>
      <section className="grow flex flex-col gap-8 px-4">
        <IncomingMessages />
        <OutgoingMessages />
        <IncomingMessages />
        <IncomingMessages />
        <IncomingMessages />
        <OutgoingMessages />
      </section>
      <form className="w-full py-4 px-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 flex gap-2">
        <input
          type="text"
          className="rounded-3xl grow py-2 px-8"
          placeholder="type your message..."
        />
        <button className="text-gray-600 text-sm font-semibold rounded-3xl py-2 px-8 bg-white ">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
