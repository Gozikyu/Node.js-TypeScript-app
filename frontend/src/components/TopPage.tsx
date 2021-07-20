import React, { VFC, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const TopPage: VFC = () => {
  const [user, setUser] = useState(null);
  const getUser = () => {
    axios
      .get("http://localhost:3000/users", { withCredentials: true })
      .then((user) => {
        setUser(user);
      });
  };

  useEffect(() => {
    getUser();
  });
  return (
    <div className="container">
      <header>
        <h1>{user}</h1>
      </header>
    </div>
  );
};

export default TopPage;
