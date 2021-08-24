import axios from "axios";
import { createContext, useState, useContext, useEffect, FC } from "react";
import { useHistory } from "react-router-dom";

type User = {
  uid: string | undefined;
  email: string | undefined;
  name: string | undefined;
};

const AuthContext = createContext<User>({
  uid: undefined,
  email: undefined,
  name: undefined,
});

const isUser = (arg: any): arg is User => {
  if (
    typeof arg.uid == "string" &&
    typeof arg.email == "string" &&
    typeof arg.name == "string"
  ) {
    return true;
  } else {
    return false;
  }
};

export function useAuthContext() {
  return useContext(AuthContext);
}

const AuthProvider: FC<{ loginUser: User }> = ({ children, loginUser }) => {
  const [user, setUser] = useState<User>({
    uid: undefined,
    email: undefined,
    name: undefined,
  });

  console.log(user);
  const history = useHistory();

  // loginUser返ってくる場合はuserにユーザを登録、いない場合はサインインページに遷移させる。
  const checkLogin = () => {
    axios
      .get("http://localhost:80/users/loginUser")
      .then((user) => {
        console.log(user.data.user);
        if (isUser(user.data.user.id)) {
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

  return (
    <AuthContext.Provider value={user}>
      {loginUser.uid && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
