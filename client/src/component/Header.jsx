import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logOut, userdatafetch } from "../api";
import { setOtherUsers, setUserData, setUsersChat } from "../context/action";
import { useNavigate } from "react-router-dom";

const Header = ({ socket, setSearchUser, searchUser }) => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchUser(e.target.value);
  };

  const logOutUser = () => {
    logOut().then((data) => {
      if (data.success) {
        dispatch(setUserData(null));
        dispatch(setUsersChat(null));
        dispatch(setOtherUsers(null));
        localStorage.setItem("userToken", false);
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    if (!userData) {
      userdatafetch().then((data) => {
        dispatch(setUserData(data.data));
        socket.emit("online", data.data._id);
      });
    }
  }, []);

  return (
    <header className="bg-[#0b141b] pt-3 absolute top-0 w-full z-10 pb-4">
      <div className="h-12 flex justify-between items-center">
        <h1 className="text-gray-100 font-semibold text-2xl ml-3">WhispChat</h1>

        <span
          onClick={logOutUser}
          className=" absolute right-24 cursor-pointer text-red-600 font-bold transition-all duration-500 ease-in hover:text-lg"
        >
          LogOut
        </span>

        <img
          className="w-9 h-9 mr-5 rounded-full border border-gray-100"
          src={`${userData?.profilePhoto}`}
          alt="profile"
        />
      </div>
      <div className="flex flex-col items-center mt-3">
        <div className="w-11/12 h-9 max-w-[900px] flex items-center border border-gray-100 rounded-2xl bg-[#242b31]">
          <label htmlFor="search-user">
            <CiSearch className="text-2xl text-gray-100 ml-2 mr-2" />
          </label>
          <input
            type="text"
            placeholder="Search..."
            id="search-user"
            value={searchUser}
            onChange={handleSearch}
            className="w-11/12 h-9 bg-transparent text-gray-100 border-none outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
