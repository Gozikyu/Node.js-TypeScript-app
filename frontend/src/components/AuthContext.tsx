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

  const history = useHistory();

  const checkLogin = () => {
    console.log("check");

    axios
      .get("http://localhost:80/users/loginUser")
      .then((user) => {
        if (isUser(user.data)) {
          setUser(user.data);
        } else {
          console.log("User型ではありません");
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/signin");
      });
  };

  useEffect(checkLogin, []);
  console.log(loginUser);
  return (
    <AuthContext.Provider value={user}>
      {loginUser.uid && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
