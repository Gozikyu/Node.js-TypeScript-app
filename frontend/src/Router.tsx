import { VFC, useState, useEffect, useCallback } from "react";
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

const Routing: VFC = () => {
  const [loginUser, setLoginUser] = useState<User>({
    uid: undefined,
    email: undefined,
    name: undefined,
  });

  type User = {
    uid: string | undefined;
    email: string | undefined;
    name: string | undefined;
  };

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
  console.log(loginUser);
  return (
    <div>
      <Router>
        <Header loginUser={loginUser} />
        <Route exact path="/signin">
          <SignIn loginUser={loginUser} setUser={setUser} />
        </Route>
        <Route exact path="/signup" component={SignUp} />
        <Switch>
          {/* <AuthProvider loginUser={loginUser}> */}
          <Route exact path="/" component={TopPage} />
          <Route exact path="/contents" component={Contents} />
          {/* </AuthProvider> */}
        </Switch>
      </Router>
    </div>
  );
};

export default Routing;
