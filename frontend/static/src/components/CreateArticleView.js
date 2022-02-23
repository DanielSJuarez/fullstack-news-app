import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AuthorDetail from './AuthorDetail';

function CreateArticleView({ auth, handleError}) {

    const [addImage, setAddImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [preview, setPreview] = useState('');
    const [modeView, setModeView] = useState(false)
    const [authorView, setAuthorView] = useState(null)
    const [phase, setPhase] = useState('')
    const [getID, setGetId] = useState('')

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
    }
    
    const deleteMessage = async () => {

        const options = {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
        }
    
        const response = await fetch(`/api/v1/articles/${getID}/user/`, options).catch(handleError);
    
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        const viewAfterDelete = authorView.filter((article) => {
          if (article.id !== getID){
              return {...article}
          }
        })
        setAuthorView(viewAfterDelete)
        setGetId('')
      }

    const authorArticleList = authorView.map(article => (
        <AuthorDetail key={article.id} {...article} setModeView={setModeView} deleteMessage={deleteMessage} setGetId={setGetId}/>

    ))

    const authorArticleListView = (
        <>
        {authorArticleList}
        <button onClick={() => setModeView(false)}>Create Content</button> 
        </>
    )

    const createArticle = (
        <div>
            <button type='button' onClick={() => setModeView(true)}>View Your Content</button>
            <p>Add Your Article</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='title' placeholder='title' onChange={handleTitleInput} value={title}></input>
                    <input type='text' name='summary' placeholder='summary' onChange={handleSummaryInput} value={summary}></input>
                    <input type='text' name='text' placeholder='text' onChange={handleTextInput} value={text}></input>
                    <input type='file' name='articleImage' onChange={handleImage} />
                    {preview && <img src={preview} alt='' />}
                </div>
                <button type='submit' onClick={()=> setPhase('DRT')}>Save</button>
                <button type='submit' onClick={()=> setPhase('SUB')}>Save/Submit</button>
            </form>
        </div>
    )

    const noneRegisterUser = (
        <div>Sign in or create an account to post your own content...</div>
    )

    return (
        <div>
            {auth ? modeView ? authorArticleListView : createArticle : noneRegisterUser}
        </div>
    )
}

export default CreateArticleView
