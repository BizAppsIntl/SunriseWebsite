import logo from './logo.svg';
import './App.css';
// import { MyNavbar } from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom'

import FontsTesting from './FontsTesting'
import LayoutLogin from './LayoutLogin'
import Home from './Pages/Home'
import About from './Pages/About'


function App() {
  return (
    <div className="w-full ">
      {/* <FontsTesting /> */}
{/* <MyNavbar/> */}

      <Routes>
        <Route element={<LayoutLogin />}>
          <Route exact path='/' element={<Home />} />
          <Route path='About' element={<About />} />
          <Route path='Contact' element={<Home />} />
          <Route path='Services' element={<About />} />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
