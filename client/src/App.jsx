import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RegisterForm } from "./components/RegisterForm";
import { Messenger } from "./components/Messenger";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/messenger" component={Messenger} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
