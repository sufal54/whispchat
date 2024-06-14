import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, ChatTemp, Singup, Login } from "./component/index";
import { useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:4000");

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken") === "true") {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="w-full h-screen absolute top-0 flex flex-col bg-[#0b141b]">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/singup" Component={Singup} />
          <Route path="/login" Component={Login} />
        </Routes>
      </div>
    </>
  );
}

export default App;
