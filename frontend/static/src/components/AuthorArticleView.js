import { useState, useEffect } from 'react';
import Cookies, { attributes } from 'js-cookie';
import AuthorDetail from './AuthorDetail';
import { useOutletContext } from "react-router-dom";

function AuthorArticleView({props}) {
    const [auth, setAuth] = useOutletContext();
    const [addImage, setAddImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [preview, setPreview] = useState('');
    const [modeView, setModeView] = useState(false)
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

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title)
        formData.append('text', text)
        formData.append('summary', summary)
        formData.append('image', addImage);
        formData.append('phase', phase);

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        fetch('/api/v1/articles/user/', options);
        setTitle('');
        setText('');
        setSummary('');
        setPreview('');
        setPhase('');
        setAddImage('')
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
            image: addImage
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
  
      }

    const authorArticleList = authorView.map(article => (
        <AuthorDetail key={article.id} {...article} getId={getId} setModeView={setModeView} deleteArticle={deleteArticle} setGetId={setGetId} editArticle={editArticle} handleImage={handleImage} handleSummaryInput={handleSummaryInput} handleTitleInput={handleTitleInput} handleTextInput={handleTextInput}/>
    ))

    return (
        <div>
            {authorArticleList}
        </div>
    )
}

export default AuthorArticleView
