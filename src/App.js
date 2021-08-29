import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar"
import Marketplace from "./pages/Marketplace"
import Collection from "./pages/Collection"

import { useWeb3React } from '@web3-react/core'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  const { account, chainId } = useWeb3React()
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/marketplace">
            {
              account ? <Marketplace /> : null
            }
          </Route>
          <Route path="/collection">
            {
              account ? <Collection /> : null
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
