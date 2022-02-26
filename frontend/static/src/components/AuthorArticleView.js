import { useState, useEffect } from 'react';
import Cookies, { attributes } from 'js-cookie';
import AuthorDetail from './AuthorDetail';
import DraftDetail from './DraftDetail';

function AuthorArticleView({props}) {
    const [addImage, setAddImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [preview, setPreview] = useState('');
    const [authorView, setAuthorView] = useState(null)
    const [phase, setPhase] = useState('')
    const [getId, setGetId] = useState('')

    const handleError = (err) => {
        console.log(err);
      }

    useEffect(() => {
        const getAuthorArticles = async () => {
            const response = await fetch('/api/v1/articles/user').catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setAuthorView(data);
            }
        }
        getAuthorArticles();
    }, []);

    if (!authorView) {
        return <div>Fetching your article data....</div>
    }

    const handleTitleInput = e => {
        const addTitle = e.target.value;
        setTitle(addTitle)
    }

    const handleTextInput = e => {
        const addText = e.target.value;
        setText(addText)
    }

    const handleSummaryInput = e => {
        const addSummary = e.target.value;
        setSummary(addSummary)
    }


    const handleImage = e => {

        const file = e.target.files[0];
        setAddImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file);
    }
  
    const deleteArticle = async (id) => {
    
        const options = {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
        }
    
        const response = await fetch(`/api/v1/articles/${id}/user/`, options).catch(handleError);
    
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        
        const viewAfterDelete = authorView.filter((article) => {
            return article.id !== id
        });
        setAuthorView(viewAfterDelete)
      }
    
      const editArticle = async (id) => {

        const updatedArticle = {
            title,
            text,
            summary,
            image: addImage,
            phase,
        }

        const formData = new FormData();
        for(const [key, value] of Object.entries(updatedArticle)) {
            if(value){
                formData.append(key, value)
            }
        }

        const options = {
          method: 'PATCH',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          body: formData
        }
    
        const response = await fetch(`/api/v1/articles/${id}/user/`, options).catch(handleError);
    
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }

        const data = await response.json();
    
        const updateEditView = authorView.map((article) => {
            if (article.id == id){
                return data
            } else {
                return article
            }
        })
        setAuthorView(updateEditView)
        setGetId('')
        setTitle('');
        setText('');
        setSummary('');
        setPreview('');
        setAddImage('')
        setPhase('');
  
      }

    const filterDRT = authorView.filter(article => (
        article.phase === 'DRT'
    ))

    const authorDraftList = filterDRT.map(article => (
        <DraftDetail key={article.id} {...article} getId={getId}  deleteArticle={deleteArticle} setGetId={setGetId} editArticle={editArticle} handleImage={handleImage} handleSummaryInput={handleSummaryInput} handleTitleInput={handleTitleInput} handleTextInput={handleTextInput} setPhase={setPhase}/>
    ))

    const filterSUB = authorView.filter(article => (
        article.phase === 'SUB'
    ))

    const authorSubmittedList = filterSUB.map(article => (
        <AuthorDetail key={article.id} {...article} getId={getId}  deleteArticle={deleteArticle} setGetId={setGetId} editArticle={editArticle} handleImage={handleImage} handleSummaryInput={handleSummaryInput} handleTitleInput={handleTitleInput} handleTextInput={handleTextInput}/>
    ))

    const filterREJ = authorView.filter(article => (
        article.phase === 'REJ'
    ))

    const authorRejectedList = filterREJ.map(article => (
        <AuthorDetail key={article.id} {...article} getId={getId}  deleteArticle={deleteArticle} setGetId={setGetId} editArticle={editArticle} handleImage={handleImage} handleSummaryInput={handleSummaryInput} handleTitleInput={handleTitleInput} handleTextInput={handleTextInput}/>
    ))

    const filterPUB = authorView.filter(article => (
        article.phase === 'PUB'
    ))

    const authorPublishedList = filterPUB.map(article => (
        <AuthorDetail key={article.id} {...article} getId={getId}  deleteArticle={deleteArticle} setGetId={setGetId} editArticle={editArticle} handleImage={handleImage} handleSummaryInput={handleSummaryInput} handleTitleInput={handleTitleInput} handleTextInput={handleTextInput}/>
    ))

    const filterARC = authorView.filter(article => (
        article.phase === 'ARC'
    ))

    const authorArchievedList = filterARC.map(article => (
        <AuthorDetail key={article.id} {...article} getId={getId}  deleteArticle={deleteArticle} setGetId={setGetId} editArticle={editArticle} handleImage={handleImage} handleSummaryInput={handleSummaryInput} handleTitleInput={handleTitleInput} handleTextInput={handleTextInput}/>
    ))

    return (
        <div className='container'>
            <h2 className='sectionHead'>Draft</h2>
                {authorDraftList}
            <h2 className='sectionHead'>Submitted</h2>
                {authorSubmittedList}
            <h2 className='sectionHead'>Published</h2>
                {authorPublishedList}
            <h2 className='sectionHead'>Rejected</h2>
                {authorRejectedList}   
            <h2 className='sectionHead'>Archieved</h2>
                {authorArchievedList}
        </div>
    )
}

export default AuthorArticleView
