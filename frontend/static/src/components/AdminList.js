import { useState, useEffect } from 'react';
import Cookies, { attributes } from 'js-cookie';

function AdminList() {
    const [adminView, setAdminView] = useState(null)

    const handleError = (err) => {
        console.log(err);
      }

    useEffect(() => {
        const getSiteArticles = async () => {
            const response = await fetch('/api/v1/articles/user').catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setAdminView(data);
            }
        }
        getSiteArticles();
    }, []);

    if (!adminView) {
        return <div>Fetching site data....</div>
    }

    const sideArticleList = authorView.map(article => (
        <AdminDetail key={article.id} {...article} getId={getId} setModeView={setModeView} deleteArticle={deleteArticle} setGetId={setGetId} editArticle={editArticle} handleImage={handleImage} handleSummaryInput={handleSummaryInput} handleTitleInput={handleTitleInput} handleTextInput={handleTextInput}/>
    ))

    return (
       <div>
           {sideArticleList}
       </div> 
    )
}
export default AdminList;