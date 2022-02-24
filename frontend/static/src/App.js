import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react'
import Cookies from 'js-cookie';
import ArticlesList from './components/ArticlesList';
import CreateArticleView from './components/AuthorArticleView';
import LoginRegisterUser from './components/Header';
import CreateArticle from './components/CreateArticle'
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
 
//   const [state, setState] = useState({
//     username: '',
//     password: ''
// })

  return (

    <div className="App">
      <Header auth={auth} setAuth={setAuth} navigate={navigate}/>
      <h1>Daily Taco News</h1>
      {/* <ArticlesList handleError={handleError} articles={articles} setArticles={setArticles}/> */}
      <Outlet context={[navigate, auth , setAuth]}/>
      {/* <CreateArticleView auth={auth} handleError={handleError}/> */}
    </div>
  );
}

export default App;
// , handleError, articles, setArticles, setAuth, state, setState
//handleError={handleError} auth={auth} setAuth={setAuth} state={state} setState={setState}