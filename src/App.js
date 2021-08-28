import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar"
import Marketplace from "./pages/Marketplace"

import { useWeb3React } from '@web3-react/core'

function App() {
  const { account, chainId } = useWeb3React()
  return (
    <div className="App">
      <NavBar />
      {
        account ? <Marketplace /> : null
      }
    </div>
  );
}

export default App;
