import React, { VFC, useState, useEffect, useCallback } from "react";
import axios from "axios";

const TopPage: VFC = () => {
  const initialUser = {
    id: 0,
    name: "initialState",
  };
  const [user, setUser] = useState<User>(initialUser);

  type User = {
    id: number;
    name: string;
  };

  const isUser = useCallback((arg: any): arg is User => {
    if (arg.id && arg.name) {
      return true;
    } else {
      return false;
    }
  }, []);

  const getUser = useCallback(() => {
    axios
      .get("http://localhost:80/users", {
        withCredentials: true,
      })
      .then((res) => {
        if (isUser(res.data.user)) setUser(res.data.user);
      });
  }, [isUser]);

  useEffect(() => {
    getUser();
  }, [getUser, isUser]);

  return (
    <div className="container">
      <header>
        <h1>{user.name}</h1>
      </header>
    </div>
  );
};

export default TopPage;
