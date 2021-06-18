import logo from './logo.svg';
import './App.css';
import {Router, Route, Switch} from 'react-router';
import UsersForm from "./pages/UsersForm";
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import MySlider from "./pages/MySlider";
import GoodProgress from "./pages/GoodProgress";
const createHistory = require("history").createHashHistory;
const history = createHistory();

function App() {
    return (
        <Router history={history}>
        <Switch>
            <Route exact path="/slider" component={GoodProgress}/>
            <Route exact path="/user" component={UsersForm}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/" component={GoodProgress}/>
            <Route exact path="*" component={NotFoundPage}/>
        </Switch>
        </Router>
    )

    return (
        <div className="App">
            <UsersForm/>

            {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
        </div>
    );
}

export default App;
