function ArticleDetail({ title, image, text, setContentView }) {

    return (
        <article className='col article'>
            <h3 className='title'>{title}</h3>
            <div className='imgHolder'>
                <img src={image} alt={title} />
            </div>
            <p className='summary'>{text}</p> 
            <button className='articleButton' onClick={() => setContentView(false)}>Back</button> 
        </article>
    )
}
export default ArticleDetail;