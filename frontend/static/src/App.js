import './App.css';
import { useState } from 'react'
import Cookies from 'js-cookie';
import ArticlesList from './components/ArticlesList';
import CreateArticleView from './components/CreateArticleView';
import LoginRegisterUser from './components/LoginRegisterUser';

function App() {
  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [articles, setArticles] = useState(null)
  const [state, setState] = useState({
    username: '',
    password: ''
})

  const handleError = (err) => {
    console.log(err);
  }

  return (

    <div className="App">
      <LoginRegisterUser handleError={handleError} auth={auth} setAuth={setAuth} state={state} setState={setState} />
      <h1>Daily Taco News</h1>
      <ArticlesList handleError={handleError} articles={articles} setArticles={setArticles}/>
      <CreateArticleView auth={auth} handleError={handleError}/>
    </div>
  );
}

export default App;
