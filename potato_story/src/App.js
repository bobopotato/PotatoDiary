import React, { useCallback } from 'react';
import './Main.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import PersistentLogin from './components/PersistentLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideMenu from './components/sideMenu/SideMenu';
import SideBarData from './components/sideMenu/SideBarData';
import useAuth from './hooks/useAuth';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu from './pages/menu/Menu';


function App() {
  const { auth } = useAuth();

  console.log(`rendering home`)

  const getRoutes = useCallback((auth) => {
    let routes = [];
    console.log(`??? ${!auth}`)
    console.log(auth)
    if (!auth) {
      routes =
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" key={'others'} element={<Navigate to={"/"} />} />
        </Routes>
    }
    else {

      const getMenuRoutes = () => {
        const routes = SideBarData.map((data) => {
          if (data.children && data.children.length > 0) {
            return <Route path={`${data.link}`} element={data.page} key={data.title}>
              {data.children.map((child) => {
                 return <Route path={`${child.link}`} element={child.page} key={child.title} />
              })}
            </Route>
          }
          return <Route path={`${data.link}`} element={data.page} key={data.title} />
        });
        console.log(routes)
        return routes;
      }

      routes = (
        <Routes>
          <Route element={<Menu />}>
            <Route element={<PersistentLogin />}>
              {getMenuRoutes()}
            </Route>
          </Route>
          <Route path="*" key={'others'} element={<Navigate to={"/MyTasks"} />} />
          {/* <Route path="*" key={'others'} element={<Navigate to={"/"} />} /> */}
        </Routes>
      )
    }
    console.log(routes)
    return routes;
  }, [auth]);

  return <div className='app-wrapper'>
    <Router>
      {getRoutes(auth)}
    </Router>
  </div>;
}

export default App;
