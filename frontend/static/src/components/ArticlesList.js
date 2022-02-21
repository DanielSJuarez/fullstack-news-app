function ArticlesList({title, image, text, name }) {

    return (
        <article className='col'>
            <h3>{title}</h3>
            <div>
                <img src={image} alt={name} />
            </div>
            <p>{text}</p>
        </article>
    )
}
export default ArticlesList