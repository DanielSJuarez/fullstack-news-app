import { set } from 'js-cookie'
import { useState } from 'react'
function AuthorDetail({ title, image, text, id, summary}) {
 
    return (
        <article className='col article'>
            <p className='title'>{title}</p>
            <div className='imgHolder'>
                <img src={image} alt={title} />
            </div>
            <p className='summary'>{summary}</p>
            <p>{text}</p>
        </article>
    )
}
export default AuthorDetail;