import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TopPage } from "./components/index";

const Routing = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/"} component={TopPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routing;
