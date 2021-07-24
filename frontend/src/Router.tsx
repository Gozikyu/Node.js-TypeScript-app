import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TopPage, Contents, Header } from "./components/index";

const Routing = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={TopPage} />
          <Route exact path="/contents" component={Contents} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routing;
