import axios from "axios";
import { useState, useEffect, FC, useContext } from "react";
import { useHistory } from "react-router-dom";

type User = {
  uid: string | undefined;
  email: string | undefined;
  name: string | undefined;
};

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    uid: undefined,
    email: undefined,
    name: undefined,
  });

  const history = useHistory();

  // ログインしているユーザの情報が返ってくる場合はuserにユーザを登録、いない場合はサインインページに遷移させる。
  const checkLogin = () => {
    axios
      .get("http://localhost:80/users/loginUser")
      .then((user) => {
        console.log(user.data.user);
        if (user.data.user.uid) {
          setUser(user.data.user);
        } else {
          console.log("ログインしていません");
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/signin");
      });
  };

  useEffect(checkLogin, []);

  return <>{!user.uid ? <></> : children}</>;
};

export default AuthProvider;
