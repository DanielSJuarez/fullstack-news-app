import { useState, useEffect } from 'react'
import ArticlePreview from './ArticlePreview';
import ArticleDetail from './ArticleDetail';

function ArticlesList({handleError}) {
    const [contentView, setContentView] = useState(false)
    const [getTitle, setGetTitle] = useState('')
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const getArticles = async () => {
            const response = await fetch('/api/v1/articles/').catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setArticles(data);
            }
        }
        getArticles();
    }, []);

    if (!articles) {
        return <div>Fetching article data....</div>
    }

    const articleFilter = articles.filter(article => (
        article.title === getTitle          
    ))

    const articleDetaillHTML = articleFilter.map(article => (
        <ArticleDetail key={article.id} {...article} setContentView={setContentView}/>
    ))
    
    const articlesHTML = articles.map(article => (
        <ArticlePreview key={article.id} {...article} setContentView={setContentView} setGetTitle={setGetTitle} getTitle={getTitle}/>
    ));

    return (
        <div>
            {contentView ? articleDetaillHTML : articlesHTML}
        </div>
    )
}
export default ArticlesList

