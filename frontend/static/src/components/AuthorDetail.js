import {useState} from 'react'
function AuthorDetail({ title, image, text, id, deleteMessage, setGetId}) {
    const [edit, setEdit] = useState(false)

    // const displayMode = (
    //     <article className='col'>
            
    //     <h3>{title}</h3>
    //     <div>
    //         <img src={image} alt={title} />
    //     </div>
    //     <p>{text}</p>
    //     <button onClick={() => setEdit(true)}>Edit</button>
    //     <button onClick={deleteMessage}>Delete</button>
    // </article>
    //     )
    
    //     const editMode = (
    //         <form onSubmit={handleEdit}>
    //             <div>
    //                 <input type='text' name='editTitle' placeholder='title' onChange={newHandleTitleInput} value={title}></input>
    //                 <input type='text' name='editSummary' placeholder='summary' onChange={newHandleSummaryInput} value={summary}></input>
    //                 <input type='text' name='editText' placeholder='text' onChange={newHandleTextInput} value={text}></input>
    //                 <input type='file' name='editArticleImage' onChange={newHandleImage} />
    //                 {preview && <img src={preview} alt='' />}
    //             </div>
    //             <button type='submit' onClick={() => setEdit(false)}>save</button>
    //        </form>
    //    )

       const remove = (e) => {
            setGetId(e.target.value)
            deleteMessage()
       }
    
    return (
        <article className='col'>
            
        <h3>{title}</h3>
        <div>
            <img src={image} alt={title} />
        </div>
        <p>{text}</p>
        <button type='button' onClick={() => setEdit(true)}>Edit</button>
        <button type='button' value={id} onClick={remove}>Delete</button>
        </article>
    )
}
export default AuthorDetail;