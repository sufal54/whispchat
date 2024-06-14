import React, { useState } from "react";
import { Body, Header } from "./index";

const Home = ({socket}) => {
  const [searchUser, setSearchUser] = useState("");
  return (
    <div
      className="w-full h-[100vh] overflow-y-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="h-20 mb-10 w-full">
        <Header socket={socket} setSearchUser={setSearchUser} searchUser={searchUser} />
      </div>
      <Body socket={socket} setSearchUser={setSearchUser} searchUser={searchUser} />
    </div>
  );
};

export default Home;
