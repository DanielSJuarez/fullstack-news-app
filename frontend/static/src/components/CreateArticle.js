import { useState, useEffect } from 'react';
import Cookies, { attributes } from 'js-cookie';

function CreateArticle (){
    const [addImage, setAddImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [preview, setPreview] = useState('');
    const [phase, setPhase] = useState('')

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

    return  (
    <div className='loginPlacholder'>
        <p>Add Your Article</p>
        <form onSubmit={handleSubmit}>
            <div className='col loginField'>
                <input className='inputField' type='text' name='title' placeholder='title' onChange={handleTitleInput} value={title}></input>
            </div>
            <div classname='col loginField'>
                <input className='inputField' type='text' name='summary' placeholder='summary' onChange={handleSummaryInput} value={summary}></input>
            </div>
            <div className='col loginField'>
                <input className='inputField' type='text' name='text' placeholder='text' onChange={handleTextInput} value={text}></input>
            </div>
            <div className='col loginField'>
                <input  className='inputField'type='file' name='articleImage' onChange={handleImage} />
                {preview && <img src={preview} alt='' />}
            </div>
            <button className='loginRegisterButton create' type='submit' onClick={()=> setPhase('DRT')}>Save</button>
            <button className='loginRegisterButton create' type='submit' onClick={()=> setPhase('SUB')}>Save/Submit</button>
        </form>
    </div>
    )
}

export default CreateArticle

