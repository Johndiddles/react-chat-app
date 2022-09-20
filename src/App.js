import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatRoom from "./pages/chatRoom/ChatRoom";
import Login from "./pages/login/Login";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { loadExistingChats, addChat } from "./redux/chatsSlice";

function App() {
  const dispatch = useDispatch();

  //** subscribe to channel */
  const channel = useMemo(() => new BroadcastChannel("app-data"), []);

  //***  listening for messages from other tabs ***//
  useEffect(() => {
    channel.onmessage = (message) => {
      console.log(message.data);
      dispatch(addChat(message.data));
    };

    // return () => {
    //   channel.close();
    // };
  }, [channel, dispatch]);

  //** load chats from database into state */
  useEffect(() => {
    if (localStorage.chats) {
      console.log("yes");
      const chatsInDb = JSON.parse(localStorage.chats);
      dispatch(loadExistingChats(chatsInDb));
    }
    return () => {};
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat-room" element={<ChatRoom channel={channel} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
