import {useState} from 'react'
import Cookies from 'js-cookie';

function AdminDetail({id, title, text, summary, image, handleError , setAdminView , adminView}){
    const [status, setStatus] = useState(false)
    const [newPhase, setNewPhase] = useState('')
    const [section, setSection] = useState(false)
    const [newCatagory, setNewCatagory] = useState('')

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

          const updateArticleCatagory = async (e) => {

            const updatedCatagory = {
                catagory: e.target.value
            }
    
            const formData = new FormData();
            for(const [key, value] of Object.entries(updatedCatagory)) {
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
            setSection(false)
            setNewCatagory('')
          }

        
        

    const listView = (
        <button className='articleButton' onClick={() => setStatus(true)}>Change status</button>
    )


    const changeSatusView = (
        <div>
            <button className='articleButton' value='REJ' onClick={updateArticleStatus}>Reject</button>
            <button className='articleButton' value='PUB' onClick={updateArticleStatus}>Publish</button>
            <button className='articleButton' value='ARC' onClick={updateArticleStatus}>Archive</button> 
            <button className='articleButton' onClick={() => setStatus(false)}>Back</button> 
        </div>
    )

    const catagoryView = (
        <button className='articleButton' onClick={() => setSection(true)}>Change Article Catagory</button>
    )


    const changeCatagoryView = (
        <div>
            <button className='articleButton' value='POP' onClick={updateArticleCatagory}>Popular</button>
            <button className='articleButton' value='TRD' onClick={updateArticleCatagory}>Trending</button>
            <button className='articleButton' value='ALL' onClick={updateArticleCatagory}>All</button> 
            <button className='articleButton' onClick={() => setSection(false)}>Back</button> 
        </div>
    )


    return(
        <article className='article'>
            <h3 className='title'>{title}</h3>
            <div className='imgHolder'>
                <img src={image} alt={title} />
            </div>
            <p className='summary'>{summary}</p>
            <p className='summary'>{text}</p>
            {status ? changeSatusView : listView}
            {section ? changeCatagoryView : catagoryView}
        </article>
    )
}

export default AdminDetail