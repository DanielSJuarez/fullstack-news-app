import { set } from 'js-cookie'
import { useState } from 'react'
function AuthorDetail({ title, image, text, id, getId, preview, deleteArticle, setGetId, editArticle, handleImage, handleSummaryInput, handleTextInput, handleTitleInput }) {
    const [edit, setEdit] = useState(false)

    const change = (e) => {
        e.preventDefault(); 
        editArticle(id)
        setEdit(false)
    }

    const displayMode = (
        <article className='col'>

            <h3>{title}</h3>
            <div>
                <img src={image} alt={title} />
            </div>
            <p>{text}</p>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => deleteArticle(id)}>Delete</button>
        </article>
    )

    const editMode = (
        <form onSubmit={change}>
            <div>
                <input type='text' name='editTitle' placeholder='title' onChange={handleTitleInput} ></input>
                <input type='text' name='editSummary' placeholder='summary' onChange={handleSummaryInput}></input>
                <input type='text' name='editText' placeholder='text' onChange={handleTextInput}></input>
                <input type='file' name='editArticleImage' onChange={handleImage} />
                {preview && <img src={preview} alt='' />}
            </div>
            <button type='submit'>save</button>
        </form>
    )

    return (
        <div>
            { edit ? editMode : displayMode }
        </div>
    )
}
export default AuthorDetail;