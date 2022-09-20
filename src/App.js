import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatRoom from "./pages/chatRoom/ChatRoom";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
