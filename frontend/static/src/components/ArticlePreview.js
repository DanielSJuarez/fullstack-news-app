function ArticlePreview({title, image, summary, name, setGetTitle ,setContentView}){

    const getArticle = (e) => {
        const findTitle = e.target.value
        setGetTitle('')
        setGetTitle(findTitle)
        setContentView(true)
    }

    return(
        <article className='col'>
            <h3>{title}</h3>
            <div>
                <img src={image} alt={name} />
            </div>
            <p>{summary}</p>
            <button value={title} onClick={getArticle}>Read More ...</button>
        </article>
    )
}
export default ArticlePreview;