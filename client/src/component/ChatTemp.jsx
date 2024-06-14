import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaLocationArrow, FaPaperclip } from "react-icons/fa";
import { CiVideoOn, CiMenuKebab } from "react-icons/ci";
import { MdOutlineCall, MdOutlineEmojiEmotions } from "react-icons/md";
import wallpaper from "../assets/wallpaper.jpg";
import { useNavigate } from "react-router-dom";
import { reciveMsg, sendMsg } from "../api";
import RecSend from "./RecSend";
import { useSelector } from "react-redux";

const ChatTemp = ({ socket, setIsChat, usersChatList, setUsersChatList }) => {
  const [chat, setChat] = useState("");
  const [selectUserChats, setSelectUserChats] = useState([]);
  const [empty, setEmpty] = useState(false);
  const state = useSelector((state) => state);
  const userData = state?.selectUser;
  console.log(userData);
  const navigate = useNavigate();
  const scrollContantRef = useRef(null);

  const scrollToBottom = () => {
    scrollContantRef.current?.scrollIntoView();
  };

  const handleChat = (e) => {
    setChat(e.target.value);
  };

  const sendSMS = () => {
    if (chat === "") {
      setTimeout(() => {
        setEmpty(false);
      }, 2000);
      setEmpty(true);
    } else {
      sendMsg(userData._id, chat)
        .then((data) => {
          setSelectUserChats((prevData) => [...prevData, data.newMessage]);
          socket.emit("sendMess", data, state.userData);
          setChat("");
        })
        .catch((e) => console.log(e));
      // const idx = usersChatList.findIndex((obj) => obj._id === userData._id);
      // if (idx === -1) {
      //   setUsersChatList((prvData) => [userData, ...prvData]);
      // } else {
      //   const newList = [...usersChatList];
      //   while (idx > 0) {
      //     newList[idx] = newList[idx - 1];
      //     idx--;
      //   }
      //   newList[0] = userData;
      //   setUsersChatList(newList);
      // }
    }
  };

  useEffect(() => {
    scrollToBottom();
    reciveMsg(userData._id).then((data) => {
      if (data.success && data.getConversation) {
        setSelectUserChats([...data.getConversation.messages]);
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectUserChats]);

  useEffect(() => {
    if (!state.otherUsers || !userData) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    socket.on("sendMess", (data) => {
      setSelectUserChats((prevData) => [...prevData, data.data.newMessage]);
    });
  }, [socket]);

  return (
    // header
    <div
      className="w-full h-full top-0 absolute z-10"
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
    >
      <div className="w-full h-16 flex items-center bg-[#0b141b] z-20">
        <span
          onClick={() => setIsChat(false)}
          className="ml-2 text-white text-xl hover:cursor-pointer"
        >
          <FaArrowLeft />
        </span>
        <img
          src={`${userData?.profilePhoto}`}
          alt=""
          className="w-12 h-12 ml-2 rounded-full"
        />
        <span className="text-white text-xl ml-3 mb-5">
          {userData?.userName}
        </span>
        <div className="w-36 h-16 absolute gap-8 flex items-center text-2xl right-0 text-white">
          <CiVideoOn />
          <MdOutlineCall />
          <CiMenuKebab />
        </div>
      </div>
      {/* body  */}

      <div
        className="w-full overflow-y-scroll text-white"
        style={{ height: "calc(100vh - 12rem)" }}
      >
        {selectUserChats?.map((item) =>
          item.senderId === userData._id ? (
            <RecSend data={item.message} isRecive={true} />
          ) : (
            <RecSend data={item.message} isRecive={false} />
          )
        )}
        <div ref={scrollContantRef} />
      </div>

      {/* text   */}
      <div className="w-full h-16 flex items-center">
        <div className="h-14 w-9/12 ml-4 flex items-center justify-between bg-[#242b31] rounded-full">
          <span className="ml-2 text-2xl text-white">
            <MdOutlineEmojiEmotions />
          </span>
          <textarea
            name=""
            id=""
            cols="20"
            rows="1"
            value={chat}
            onChange={handleChat}
            className="w-10/12 ml-2 text-gray-100 flex items-center bg-transparent rounded-2xl border-none focus:outline-none resize-none"
          ></textarea>
          <span className="text-xl text-white opacity-70 mr-6">
            <FaPaperclip />
          </span>
        </div>

        <div
          onClick={sendSMS}
          className={`w-12 h-12 ml-3 text-2xl ${
            empty ? "bg-red-500" : "bg-[#20a759]"
          } rounded-full flex items-center justify-center`}
        >
          <FaLocationArrow />
        </div>
      </div>
    </div>
  );
};

export default ChatTemp;
