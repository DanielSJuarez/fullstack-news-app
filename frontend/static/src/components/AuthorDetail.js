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
    
        // const editMode = (
           // <button onClick={() => setEdit(false)}>save</button>
       // )

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