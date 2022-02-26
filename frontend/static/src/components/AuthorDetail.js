import { set } from 'js-cookie'
import { useState } from 'react'
function AuthorDetail({ title, image, text, id, summary}) {
 
    return (
        <article className='article'>
            <h3 className='title'>{title}</h3>
            <div className='imgHolder'>
                <img src={image} alt={title} />
            </div>
            <p className='summary'>{summary}</p>
            <p className='summary'>{text}</p>
        </article>
    )
}
export default AuthorDetail;