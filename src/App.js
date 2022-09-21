import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatRoom from "./pages/chatRoom/ChatRoom";
import Login from "./pages/login/Login";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import {
  loadExistingChats,
  addChat,
  increaseIncomingCount,
} from "./redux/chatsSlice";

function App() {
  const dispatch = useDispatch();
  const chatScrollRef = useRef(null);

  //** subscribe to channel */
  const channel = useMemo(() => new BroadcastChannel("app-data"), []);
  // const [incomingCounter, setIncomingCounter] = useState(0);

  //***  listening for messages from other tabs ***//
  const counter = useRef(false);

  //** load chats from database into state */
  useEffect(() => {
    if (!counter.current) {
      if (localStorage.chats) {
        console.log(JSON.parse(localStorage.chats));
        const chatsInDb = JSON.parse(localStorage.chats);
        dispatch(loadExistingChats(chatsInDb));
      }

      counter.current = true;
    }
    return () => {};
  }, [dispatch]);

  /////////////////////////////////////
  useEffect(() => {
    channel.onmessage = async (message) => {
      // console.log("channel", Object.keys(message.data)?.length);
      // console.log(message.data);
      dispatch(addChat(message.data));
      setTimeout(() => {
        if (localStorage.chats) {
          dispatch(increaseIncomingCount());
        }
      }, 100);
      setTimeout(
        () =>
          (chatScrollRef.current.scrollTop =
            chatScrollRef.current.scrollHeight),
        200
      );
    };
  }, [channel, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/chat-room"
            element={
              <ChatRoom
                channel={channel}
                pageRef={chatScrollRef}
                // incomingCounter={incomingCounter}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
