function AuthorDetail({ title, image, text}) {

    return (
        <article className='col'>
            
            <h3>{title}</h3>
            <div>
                <img src={image} alt={title} />
            </div>
            <p>{text}</p>
        </article>
    )
}
export default AuthorDetail;