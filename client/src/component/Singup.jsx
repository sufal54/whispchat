import React, { useEffect, useState } from "react";
import { singUp } from "../api/index";
import wallpaper from "../assets/wallpaper.jpg";
import { Link, useNavigate } from "react-router-dom";
import { male, female } from "../helper/index";

const Singup = () => {
  const [wrongPass, setWrongPass] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [singUpData, setSingUpData] = useState({
    fullName: "",
    userName: "",
    password: "",
    profilePhoto: "",
    eMail: "",
    gender: "male",
  });

  const navigate = useNavigate();

  const setProfile = () => {
    const idx = Math.floor(Math.random() * 4);
    if (singUpData.gender !== "male") {
      setSingUpData({
        ...singUpData,
        profilePhoto: female[idx],
      });
    } else {
      setSingUpData({
        ...singUpData,
        profilePhoto: male[idx],
      });
    }
  };

  const handleSumbmit = (e) => {
    e.preventDefault();
    if (
      singUpData.fullName !== "" &&
      singUpData.userName !== "" &&
      singUpData.password !== "" &&
      singUpData.eMail !== "" &&
      singUpData.profilePhoto !== ""
    ) {
      singUp(singUpData).then((data) => {
        setUserExists(data.message === "User Exist");
        if (data.success) navigate("/login");
      });
    }
  };

  const handelChange = (e) => {
    setTimeout(() => {}, 500);
    const { name, value } = e.target;
    setSingUpData({
      ...singUpData,
      [name]: value,
    });
    setWrongPass(name === "conpassword" && value !== singUpData.password);
  };

  useEffect(() => {
    setProfile();
  }, [singUpData.gender]);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="w-10/12 max-w-[500px] h-11/12 max-h-[800px] flex flex-col overflow-y-scroll items-center justify-center backdrop-blur-sm rounded-xl border border-gray-100 shadow-2xl p-4">
        <h1 className="text-white text-2xl font-bold mt-5 mb-5">Sing-Up</h1>
        <Link
          to={"/login"}
          className="text-red-500 relative right-28 bottom-12 text-xl "
        >
          Login
        </Link>
        <form onSubmit={handleSumbmit}>
          <label htmlFor="fullName" className="text-white">
            Full Name:
          </label>
          <div className="mt-2 mb-5">
            <input
              type="text"
              name="fullName"
              value={singUpData.fullName}
              onChange={handelChange}
              className="w-11/12 h-9 px-3 bg-transparent text-gray-100 border border-gray-100 rounded-lg outline-none"
            />
          </div>

          <label htmlFor="eMail" className="text-white ">
            E-Mail:
          </label>
          <div className="mt-2 mb-5">
            <input
              type="text"
              name="eMail"
              value={singUpData.eMail}
              onChange={handelChange}
              className="w-11/12 h-9 bg-transparent px-3 text-gray-100 border border-gray-100 rounded-lg outline-none"
            />
          </div>

          <label htmlFor="userName" className="text-white ">
            UserName:{" "}
            {userExists ? (
              <span className=" text-sm text-red-500">
                {" "}
                User already Exists
              </span>
            ) : null}
          </label>
          <div className="mt-2 mb-5">
            <input
              type="text"
              name="userName"
              value={singUpData.userName}
              onChange={handelChange}
              className={`w-11/12 h-9 px-3 bg-transparent text-gray-100 border ${
                userExists ? "border-red-500" : "border-gray-100"
              } rounded-lg outline-none`}
            />
          </div>

          <label htmlFor="password" className="text-white ">
            Password:
          </label>
          <div className="mt-2 mb-5">
            <input
              type="password"
              name="password"
              value={singUpData.password}
              onChange={handelChange}
              className="w-11/12 h-9 px-3 bg-transparent text-gray-100 border border-gray-100 rounded-lg outline-none"
            />
          </div>

          <label htmlFor="conpassword" className="text-white ">
            Conform Password:
          </label>
          <div className="mt-2 mb-5">
            <input
              type="text"
              name="conpassword"
              onChange={handelChange}
              className={`w-11/12 h-9 px-3 bg-transparent text-gray-100 border ${
                wrongPass ? "border-red-500" : "border-gray-100"
              } rounded-lg outline-none`}
            />
          </div>

          <label htmlFor="gender" className="text-white ">
            Gender:
          </label>
          <div className="mt-2 mb-5">
            <select
              name="gender"
              id=""
              onChange={handelChange}
              className="w-32 px-3 rounded-md border border-gray-100 bg-transparent text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="w-full flex items-center justify-center mt-12 mb-9">
            <button
              type="submit"
              className="w-24 h-14 rounded-full text-white text-xl font-bold bg-red-500 active:scale-75 transition duration-100 ease-in"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Singup;
