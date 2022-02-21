function ArticlePreview({title, image, summary, name, setContentView}){

    return(
        <article className='col'>
            <h3>{title}</h3>
            <div>
                <img src={image} alt={name} />
            </div>
            <p>{summary}</p>
            <button onClick={()=> setContentView(true)}>Read More ...</button>
        </article>
    )
}
export default ArticlePreview;