function ArticleDetail({ title, image, text, setContentView }) {

    return (
        <article className='col'>
            <nav>
                <button onClick={() => setContentView(false)}>Back</button>
            </nav>
            <h3>{title}</h3>
            <div>
                <img src={image} alt={title} />
            </div>
            <p>{text}</p>
        </article>
    )
}
export default ArticleDetail;