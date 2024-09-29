import logo from './logo.svg';
import './App.css';
// import { MyNavbar } from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom'

import FontsTesting from './FontsTesting';


function App() {
  return (
    <div className="App">
      <FontsTesting />

{/* <MyNavbar/> */}
      <div className="text-5xl font-bold underline">
        Hello world!
      </div>


      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
