import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { userContext } from "./userContext";
import AccountService from './Services/UserService';
import Login from './Pages/Login';
import Posts from './Pages/Posts';
import Navbar from './Components/Navbar';
import './App.css';

export default function App() {
  const service = new AccountService();
  const [stateUser, setStateUser] = useState(null);
  const navigate = useNavigate();
  let user;

  const value = {
    user: stateUser,
    userLogin: LoginUser,
    userLogout: LogoutUser,
  };

  function LoginUser(userObj){
    console.log('Logging user in');
    console.log(userObj);
    setStateUser(userObj);
  }

  function LogoutUser(){
    console.log('Logging user out');
    setStateUser(null);
    setStateUser(null);
  }

  useEffect(() => {
    user = JSON.parse(service.getUserSession());
    if(user != null){
      navigate("/posts");
    }
  }, []);
  
  
  return (
    <div className="App">
      <userContext.Provider value={value}>
        <Navbar/>
        <Routes>
          <Route path='/' element={ user != null ? <Posts/> : <Login />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/posts' element={<Posts/>}/>
        </Routes>
      </userContext.Provider>
    </div>
  );
}