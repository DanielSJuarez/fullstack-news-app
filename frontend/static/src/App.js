import './App.css';
import ArticlesList from './components/ArticlesList';
import CreateArticleView from './components/CreateArticleView';
import LoginRegisterUser from './components/LoginRegisterUser';

function App() {

  const handleError = (err) => {
    console.log(err);
}
  
  return (

    <div className="App">
      <LoginRegisterUser handleError={handleError}/>
      <h1>Daily Taco News</h1>
      <CreateArticleView />
      <ArticlesList handleError={handleError}/>
    </div>
  );
}

export default App;
