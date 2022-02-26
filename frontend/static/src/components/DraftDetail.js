import { set } from 'js-cookie'
import { useState } from 'react'
function DraftDetail({ title, image, text, id, summary, preview, deleteArticle, editArticle, handleImage, handleSummaryInput, handleTextInput, handleTitleInput, setPhase}) {
    const [edit, setEdit] = useState(false)

    const change = (e) => {
        e.preventDefault(); 
        editArticle(id)
        setEdit(false)
    }

    const displayMode = (
        <article className='article'>
            <p className='title'>{title}</p>
            <div className='imgHolder'>
                <img src={image} alt={title} />
            </div>
            <p className='summary'>{summary}</p>
            <p>{text}</p>
            <button className='editDeleteButton' onClick={() => setEdit(true)}>Edit</button>
            <button className='editDeleteButton' onClick={() => deleteArticle(id)}>Delete</button>
        </article>
    )

    const editMode = (
        <>
        <article className='article'>
                <h3 className='title'>{title}</h3>
                <div className='imgHolder'>
                    <img src={image} alt={title} />
                 </div>
                 <p className='summary'>{summary}</p>
                 <p>{text}</p>
            </article>
        <form onSubmit={change}>
            <div className='col loginField'>
                <input className='inputField' type='text' name='editTitle' placeholder='title' onChange={handleTitleInput} ></input>
            </div>
            <div className='col loginField'>
                <input className='inputField' type='text' name='editSummary' placeholder='summary' onChange={handleSummaryInput}></input>
            </div>
            <div className='col loginField'>
                <input className='inputField' type='text' name='editText' placeholder='text' onChange={handleTextInput}></input>
            </div>
            <div className='col loginField'>
                <input className='inputField' type='file' name='editArticleImage' onChange={handleImage} />
                {preview && <img src={preview} alt='' />}
            </div>
            <button className='loginRegisterButton create' type='submit' onClick={()=> setPhase('DRT')}>Save</button>
            <button className='loginRegisterButton create' type='submit' onClick={()=> setPhase('SUB')}>Save/Submit</button>
        </form>
        <button className='loginRegisterButton create' onClick={() => setEdit(false)}>Back</button>
        </>
    )

    return (
        <div>
            { edit ? editMode : displayMode }
        </div>
    )
}
export default DraftDetail;