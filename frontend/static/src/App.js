import './App.css';
import { useState } from 'react'
import Cookies from 'js-cookie';
import ArticlesList from './components/ArticlesList';
import CreateArticleView from './components/CreateArticleView';
import LoginRegisterUser from './components/LoginRegisterUser';

function App() {
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));

  const handleError = (err) => {
    console.log(err);
  }

  return (

    <div className="App">
      <LoginRegisterUser handleError={handleError} auth={auth} setAuth={setAuth} />
      <h1>Daily Taco News</h1>
      <ArticlesList handleError={handleError} />
      <CreateArticleView auth={auth} />
    </div>
  );
}

export default App;
