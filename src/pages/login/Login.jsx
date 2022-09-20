import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const nameRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    if (name === "") {
      alert("Please, enter your name!");
      nameRef.current.focus();
      return;
    }
    alert(`Welcome ${name}!`);
    navigate("/chat-room", { replace: true });
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <form className=" w-[320px] flex flex-col bg-gray-300 bg-opacity-25 backdrop-blur-sm gap-2 py-8 px-8 rounded-xl items-start">
        <label className="text-md font-semibold" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="py-2 px-4 rounded-sm w-full"
        />
        <div className="w-full flex justify-center">
          <button
            onClick={onSubmit}
            className="bg-purple-500 text-white mt-4 py-2 px-8 rounded-md font-semibold text-lg hover:bg-purple-800 duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
