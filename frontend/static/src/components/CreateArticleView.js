import { useState } from 'react';
import Cookies from 'js-cookie';

function CreateArticleView() {

    const [addImage, setAddImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [preview, setPreview] = useState('');

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

        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoekn'),
            },
            body: formData, 
        }

        fetch('/api/v1/articles/', options);
        setTitle('');
        setText('');
        setSummary('');
        setPreview('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='title' placeholder='title' onChange={handleTitleInput} value={title}></input>
                    <input type='text' name='summary' placeholder='summary' onChange={handleSummaryInput} value={summary}></input>
                    <input type='text' name='text' placeholder='text' onChange={handleTextInput} value={text}></input>
                    <input type='file' name='articleImage' onChange={handleImage} />
                    {preview && <img src={preview} alt='' />}
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateArticleView