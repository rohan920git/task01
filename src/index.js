import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import App from './App';
const PrivateRoute = ()=>{
  const data = localStorage.getItem("token")

  return !data?<Navigate to={"/login"}/> : <Outlet/>
}

const GuardLogin = ()=>{
  const data = localStorage.getItem("token")

  return data?<Navigate to={"/"}/> : <Outlet/>
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route element={<GuardLogin/>}>
       <Route path='/login' element={<Login/>}/>
       </Route>
      <Route element={<PrivateRoute/>}>
       <Route path='/' element={<Home/>}/>
      </Route>
     </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

