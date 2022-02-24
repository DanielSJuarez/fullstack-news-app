import { set } from 'js-cookie'
import { useState } from 'react'
function AuthorDetail({ title, image, text, id, summary}) {
 
    return (
        <article className='col'>

            <h3>{title}</h3>
            <div>
                <img src={image} alt={title} />
            </div>
            <p>{summary}</p>
            <p>{text}</p>
        </article>
    )
}
export default AuthorDetail;