import { useRadioGroup } from "@material-ui/core";
import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  FC,
} from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

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

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>({
      uid: undefined,
      email: undefined,
      name: undefined,
    }),
    [loading, setLoading] = useState(true);

  const history = useHistory();

  // const checkLogin = () => {
  //   console.log("check");
  //   axios.get("http://localhost:80/users/loginUser").then((user) => {
  //     // if (isUser(user)) {
  //     // setUser(user);
  //     console.log(user.data.uid);
  //   });
  // };

  const checkLogin = () => {
    console.log("check");
    axios.get("http://localhost:80/users/loginUser").then((user) => {
      if (isUser(user.data)) {
        setUser(user.data);
        setLoading(false);
      } else {
        console.log("User型ではありません");
        console.log(user);
        setLoading(false);
      }
    });
  };

  useEffect(
    // const checkLogin = auth.onAuthStateChanged((user) => {
    //   if (isUser(user)) {
    //     setUser(user);
    //     setLoading(false);
    //     console.log(user);
    //   } else {
    //     setLoading(false);
    //     history.push("/signin");
    //   }
    // });
    // return () => {
    //   checkLogin();
    // };
    checkLogin,
    []
  );

  return (
    <AuthContext.Provider value={user}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
