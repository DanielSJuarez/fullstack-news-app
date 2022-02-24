import {useState} from 'react'

function AdminDetail(){
    const [phase, setPhase] = useState(false)
    const displayMode = (
        <article className='col'>

            <h3>{title}</h3>
            <div>
                <img src={image} alt={title} />
            </div>
            <p>{summary}</p>
            <p>{text}</p>
        </article>
    )

    const reviewMode = (
        <div>hi</div>
    )

    return(
        <div>
            {phase ? reviewMode : displayMode}
        </div>
    )
}