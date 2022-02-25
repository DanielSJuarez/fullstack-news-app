function ArticlePreview({title, image, summary, name, setGetTitle ,setContentView}){

    const getArticle = (e) => {
        const findTitle = e.target.value
        setGetTitle('')
        setGetTitle(findTitle)
        setContentView(true)
    }

    return(
        <article className='article'>
            <p className='title'>{title}</p>
            <div className='imgHolder'>
                <img src={image} alt={name} />
            </div>
            <p className='summary'>{summary}</p>
            <button className='articleButton' value={title} onClick={getArticle}>Read More ...</button>
        </article>
    )
}
export default ArticlePreview;