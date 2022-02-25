import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react'
import Cookies from 'js-cookie';
import Header from './components/Header';


function App() {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [admin, setAdmin] = useState(false)

  return (

    <div className="App">
      <Header auth={auth} setAuth={setAuth} navigate={navigate} admin={admin} setAdmin={setAdmin}/>
      <h1>Daily Taco News</h1>
      <Outlet context={[auth, setAuth, navigate, admin, setAdmin]}/>
    </div>
  );
}

export default App;
