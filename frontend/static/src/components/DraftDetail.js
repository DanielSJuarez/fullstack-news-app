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
        <article className='col'>

            <h3>{title}</h3>
            <div>
                <img src={image} alt={title} />
            </div>
            <p>{summary}</p>
            <p>{text}</p>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => deleteArticle(id)}>Delete</button>
        </article>
    )

    const editMode = (
        <>
        <article className='col'>
                <h3>{title}</h3>
                <div>
                    <img src={image} alt={title} />
                 </div>
                 <p>{summary}</p>
                 <p>{text}</p>
            </article>
        <form onSubmit={change}>
            <div>
                <input type='text' name='editTitle' placeholder='title' onChange={handleTitleInput} ></input>
                <input type='text' name='editSummary' placeholder='summary' onChange={handleSummaryInput}></input>
                <input type='text' name='editText' placeholder='text' onChange={handleTextInput}></input>
                <input type='file' name='editArticleImage' onChange={handleImage} />
                {preview && <img src={preview} alt='' />}
            </div>
            <button type='submit' onClick={()=> setPhase('DRT')}>Save</button>
            <button type='submit' onClick={()=> setPhase('SUB')}>Save/Submit</button>
        </form>
        <button onClick={() => setEdit(false)}>Back</button>
        </>
    )

    return (
        <div>
            { edit ? editMode : displayMode }
        </div>
    )
}
export default DraftDetail;