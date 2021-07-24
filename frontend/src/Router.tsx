import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TopPage, Contents } from "./components/index";

const Routing = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={TopPage} />
          <Route exact path="/contents" component={Contents} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routing;
