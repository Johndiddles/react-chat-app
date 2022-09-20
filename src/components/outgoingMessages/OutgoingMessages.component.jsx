import React from "react";
import user from "../../assets/user.png";

const OutgoingMessages = ({ chat }) => {
  return (
    <div className="w-full flex justify-end gap-4">
      <div className="flex flex-col items-start bg-gray-200 rounded w-max text-gray-500 py-2 px-4">
        <div className="text-sm font-bold">You</div>
        <div className="text">
          {chat?.message || "User 1 dropped a message for you"}
        </div>
      </div>
      <div className="rounded-full bg-gray-300 w-12 h-12 shadow-sm overflow-hidden shadow-gray-400">
        <img src={user} alt="user avatar" className="h-full" />
      </div>
    </div>
  );
};

export default OutgoingMessages;
