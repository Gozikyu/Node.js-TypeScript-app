import { VFC, useState, useEffect, useCallback, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import {
  TopPage,
  Contents,
  Header,
  SignUp,
  AuthProvider,
  SignIn,
} from "./components/index";

type User = {
  uid: string | undefined;
  email: string | undefined;
  name: string | undefined;
};

export const AuthContext = createContext<User>({
  uid: undefined,
  email: undefined,
  name: undefined,
});

const Routing: VFC = () => {
  const [loginUser, setLoginUser] = useState<User>({
    uid: undefined,
    email: undefined,
    name: undefined,
  });

  const isUser = useCallback((arg: any): arg is User => {
    if (
      arg !== null &&
      typeof arg.uid == "string" &&
      typeof arg.email == "string" &&
      typeof arg.name == "string"
    ) {
      return true;
    } else {
      return false;
    }
  }, []);

  const setUser = (user: User) => {
    setLoginUser(user);
  };

  const checkLogin = () => {
    axios.get("http://localhost:80/users/loginUser").then((res) => {
      if (isUser(res.data.user)) {
        setLoginUser(res.data.user);
      } else {
        console.log("User型ではありません");
      }
    });
  };

  useEffect(checkLogin, []);
  return (
    <div>
      <Router>
        <AuthContext.Provider value={loginUser}>
          <Header />
          <Switch>
            <Route exact path="/signin">
              <SignIn setUser={setUser} />
            </Route>
            <Route exact path="/signup" component={SignUp} />
            <AuthProvider>
              <Route exact path="/">
                <TopPage />
              </Route>
              <Route exact path="/contents" component={Contents} />
            </AuthProvider>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
};

export default Routing;
