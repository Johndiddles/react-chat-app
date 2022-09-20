import React from "react";
import user from "../../assets/user.png";

const IncomingMessages = () => {
  return (
    <div className="w-full flex justify-start gap-4">
      <div className="rounded-full bg-purple-500 w-12 h-12 shadow-sm overflow-hidden shadow-purple-400">
        <img src={user} alt="user avatar" className="h-full" />
      </div>
      <div className="flex flex-col items-start bg-purple-700 rounded w-max text-white py-2 px-4">
        <div className="text-sm font-bold">User 1</div>
        <div className="text">User 1 dropped a message for you</div>
      </div>
    </div>
  );
};

export default IncomingMessages;
