import React from "react";
import { useDispatch } from "react-redux";
import { setSelectUser } from "../context/action";

const UserCard = ({ data, isOnline, setIsChat }) => {
  const dispatch = useDispatch();

  const selectUser = (user) => {
    dispatch(setSelectUser(user));
    setIsChat(true);
  };

  return (
    <div
      onClick={() => selectUser(data)}
      className="w-11/12 h-[80px] mt-6 rounded-2xl flex items-center cursor-pointer hover:bg-gray-400 transition duration-200 ease-in"
    >
      <img
        src={data.profilePhoto}
        loading="lazy"
        alt=""
        className="w-14 h-14 ml-2 rounded-full"
      />
      <div className="flex flex-col ml-2">
        <span className="text-xl font-semibold text-white">
          {data.userName}
        </span>
        <span className="text-white opacity-70">{data?.fullName}</span>
      </div>
      {isOnline && (
        <div className="w-3 h-3 bg-green-500 relative rounded-full bottom-6 left-2" />
      )}
    </div>
  );
};

export default UserCard;
