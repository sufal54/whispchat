import React, { useState } from "react";
import wallpaper from "../assets/wallpaper.jpg";
import { useDispatch } from "react-redux";
import { login } from "../api";
import { setUserData } from "../context/action";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [wrongAcc, setWrongAcc] = useState(false);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [seePass, setSeePass] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSumbmit = (e) => {
    e.preventDefault();
    if (loginData.userName !== "" && loginData.password !== "") {
      login(loginData.userName, loginData.password).then((data) => {
        setWrongAcc(!data.success);
        if (data.success) {
          dispatch(setUserData(data.data));
          localStorage.setItem("userToken", "true");
          navigate("/");
        } else {
          localStorage.setItem("userToken", "false");
          navigate("/login");
        }
      });
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="w-10/12 max-w-[500px] h-11/12 max-h-[800px] flex flex-col overflow-y-scroll items-center justify-center backdrop-blur-sm rounded-xl border border-gray-100 shadow-2xl p-4">
        <Link to={"/singup"} className="text-red-500">
          Create account
        </Link>
        <h1 className="text-white text-2xl font-bold mt-5 mb-5">Log-In</h1>
        <form onSubmit={handleSumbmit}>
          <label htmlFor="userName" className="text-white ">
            User Name:
          </label>
          <div className="mt-2 mb-5">
            <input
              type="text"
              name="userName"
              value={loginData.userName}
              onChange={handelChange}
              className={`w-11/12 h-9 bg-transparent px-3 text-gray-100 border ${
                wrongAcc ? "border-red-500" : "border-gray-100"
              } rounded-lg outline-none`}
            />
          </div>

          <label htmlFor="password" className="text-white ">
            Password:
          </label>
          <div className="mt-2 mb-5">
            <input
              type={`${seePass ? "text" : "password"}`}
              name="password"
              value={loginData.password}
              onChange={handelChange}
              className={`w-11/12 h-9 px-3 bg-transparent text-gray-100 border ${
                wrongAcc ? "border-red-500" : "border-gray-100"
              } rounded-lg outline-none`}
            />
            <div
              onClick={() => setSeePass(!seePass)}
              className={`h-9 w-9 rounded-md flex items-center justify-center text-black ${
                seePass ? "bg-green-500" : "bg-red-500"
              } relative left-56 bottom-9 text-2xl cursor-pointer`}
            >
              <span>{seePass ? <FaRegEyeSlash /> : <FaRegEye />}</span>
            </div>
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

export default Login;
