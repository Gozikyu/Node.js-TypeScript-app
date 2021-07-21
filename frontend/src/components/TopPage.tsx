import React, { VFC, useState, useEffect } from "react";
import axios from "axios";

const TopPage: VFC = () => {
  const [user, setUser] = useState("");

  type axiosResponse = {
    userName: string;
  };
  const getUser = () => {
    axios
      .get<axiosResponse>("http://localhost:3000/users", {
        withCredentials: true,
      })
      .then((user) => {
        if (typeof user == "string") setUser(user);
      });
  };

  useEffect(() => {
    getUser();
  });

  console.log(user);
  return (
    <div className="container">
      <header>
        <h1>hoge</h1>
      </header>
    </div>
  );
};

export default TopPage;
