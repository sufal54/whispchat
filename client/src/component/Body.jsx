import React, { useEffect, useState } from "react";
import { ChatTemp, UserCard } from "./index";
import { getAll, userChatsList } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setUsersChat } from "../context/action";

const Body = ({ setSearchUser, searchUser, socket }) => {
  const [isExplore, setIsExplore] = useState(
    localStorage.getItem("isExplore") === "true" || false
  );
  const [isChat, setIsChat] = useState(false);
  const [usersChatList, setUsersChatList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const state = useSelector((state) => state);
  const [allUsers, setAllUsers] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.otherUsers) {
      getAll().then((data) => {
        dispatch(setOtherUsers(data.otheUser));
        setAllUsers(data.otheUser);
      });
    }
    if (!state.usersChat) {
      userChatsList().then((data) =>
        dispatch(setUsersChat(data.getConversation))
      );
    }
    socket.on("listonline", (data) => {
      setOnlineUsers(data);
    });
  }, []);

  useEffect(() => {
    if (state?.usersChat) {
      const chatList = state.usersChat?.map((data) => data.participants);
      const concatArray = [].concat(...chatList);
      const filterList = [...new Set(concatArray)];
      const filterUser = filterList.map((id) => {
        return state?.otherUsers?.find((item) => item._id === id);
      });
      setUsersChatList((preData) => [...preData, ...filterUser]);
    }
  }, [state.usersChat, state.otherUsers]);

  useEffect(() => {
    socket.on("listonline", (data) => {
      setOnlineUsers(data);
    });
    socket.on("senderMsg", (data) => {
      setUsersChatList((preData) => [
        data,
        ...preData?.filter((item) => item?._id !== data._id),
      ]);
    });
    socket.on("newSender", (senderData) => {
      setAllUsers((prvData) => [senderData, ...prvData]);
      setUsersChatList((preData) => [senderData, ...preData]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col items-center mt-3">
      {isChat && (
        <ChatTemp
          usersChatList={usersChatList}
          setUsersChatList={setUsersChatList}
          setIsChat={setIsChat}
          socket={socket}
        />
      )}
      <div className="w-full overflow-y-scroll flex flex-col items-center">
        {isExplore
          ? allUsers
              ?.filter((item) =>
                searchUser !== ""
                  ? item.userName
                      .toLowerCase()
                      .includes(searchUser.toLowerCase())
                  : item
              )
              ?.map((item) => (
                <UserCard
                  setIsChat={setIsChat}
                  data={item}
                  isOnline={onlineUsers.indexOf(item._id) === -1 ? false : true}
                />
              ))
          : usersChatList
              ?.filter((item) =>
                item
                  ? searchUser !== ""
                    ? item.userName
                        .toLowerCase()
                        .includes(searchUser.toLowerCase())
                    : item
                  : null
              )
              .map((item) =>
                item ? (
                  <UserCard
                    setIsChat={setIsChat}
                    data={item}
                    isOnline={
                      onlineUsers.indexOf(item._id) === -1 ? false : true
                    }
                  />
                ) : null
              )}
      </div>
      <button
        onClick={() => {
          setIsExplore(!isExplore);
          localStorage.setItem("isExplore", `${!isExplore}`);
          setSearchUser("");
        }}
        className="w-20 h-10 text-white absolute bottom-20 right-12 bg-green-500 border border-white rounded-xl"
      >
        {isExplore ? "Chats" : "Explore"}
      </button>
    </div>
  );
};

export default Body;
