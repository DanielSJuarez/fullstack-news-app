import {useState} from 'react'
import Cookies from 'js-cookie';

function AdminDetail({id, title, text, summary, image, handleError , setAdminView , adminView}){
    const [status, setStatus] = useState(false)
    const [newPhase, setNewPhase] = useState('')

        const updateArticleStatus = async (e) => {

            const updatedArticle = {
                phase: e.target.value
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
        
            const response = await fetch(`/api/v1/articles/${id}/admin/`, options).catch(handleError);
        
            if (!response.ok) {
              throw new Error('Network response was not OK');
            }
    
            const data = await response.json();

            const updateArticleStatus = adminView.map((article) => {
                if (article.id == id){
                    return data
                } else {
                    return article
                }
            })
        
            setAdminView(updateArticleStatus)
            setStatus(false)
            setNewPhase('')
          }

        
        

    const listView = (
        <button onClick={() => setStatus(true)}>Change status</button>
    )


    const changeSatusView = (
        <div>
            <button value='REJ' onClick={updateArticleStatus}>Reject</button>
            <button value='PUB' onClick={updateArticleStatus}>Publish</button>
            <button value='ARC' onClick={updateArticleStatus}>Archive</button> 
            <button onClick={() => setStatus(false)}>Back</button> 
        </div>
    )


    return(
        <article className='col'>

            <h3>{title}</h3>
            <div>
                <img src={image} alt={title} />
            </div>
            <p>{summary}</p>
            <p>{text}</p>
            {status ? changeSatusView : listView}
        </article>
    )
}

export default AdminDetail