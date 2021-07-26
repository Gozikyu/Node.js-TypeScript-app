import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  TopPage,
  Contents,
  Header,
  SignUp,
  AuthProvider,
  SignIn,
} from "./components/index";

const Routing = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={TopPage} />
            <Route exact path="/contents" component={Contents} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default Routing;
