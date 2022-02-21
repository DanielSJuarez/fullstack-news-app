import './App.css';
import { useState, useEffect } from 'react'
import ArticleDetailView from './components/ArticleDetailView';
import ArticlesList from './components/ArticlesList';
import CreateArticleView from './components/CreateArticleView';
import LoginRegisterUser from './components/LoginRegisterUser';

function App() {
  const [articlesList, setArticlesList] = useState(null)

  const handleError = (err) => {
    console.log(err);
  }


  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch('/api/v1/articles/').catch(handleError);

      if (!response.ok) {
        throw new Error('Netword response was not OK!')
      } else {
        const data = await response.json();
        setArticlesList(data);
      }
    }
    getArticles();
  }, [])

  if (!articlesList) {
    return <div>Fetching article data....</div>
  }


  const articleDisplay = articlesList.map(article => (
    <ArticlesList key={article.id} {...article} />
  ))

  return (

    <div className="App">
      <LoginRegisterUser />
      <h1>Daily Taco News</h1>
      <CreateArticleView />
      {articleDisplay}
      <ArticleDetailView />
    </div>
  );
}

export default App;
