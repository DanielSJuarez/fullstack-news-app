import './App.css';
import ArticlesList from './components/ArticlesList';
import CreateArticleView from './components/CreateArticleView';
import LoginRegisterUser from './components/LoginRegisterUser';

function App() {
  
  return (

    <div className="App">
      <LoginRegisterUser/>
      <h1>Daily Taco News</h1>
      <CreateArticleView />
      <ArticlesList/>
    </div>
  );
}

export default App;
