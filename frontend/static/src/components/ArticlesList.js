import { useState, useEffect } from 'react'
import ArticlePreview from './ArticlePreview';
import ArticleDetail from './ArticleDetail';

function ArticlesList() {
    const [articles, setArticles] = useState(null)
    const [contentView, setContentView] = useState(false)

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
                setArticles(data);
            }
        }
        getArticles();
    }, []);

    if (!articles) {
        return <div>Fetching article data....</div>
    }

    const articlesHTML = articles.map(article => (
        <ArticlePreview key={article.id} {...article} setContentView={setContentView}/>
    ));

    return (
        <div>
            {contentView ? <ArticleDetail/> : articlesHTML}
        </div>
    )
}
export default ArticlesList