function CreateArticle ({setModeView, handleTitleInput, handleTextInput, handleSummaryInput, handleSubmit, preview, setPhase, title, summary, text, handleImage}){
    return  (
    <div>
        <button type='button' onClick={() => setModeView(true)}>View Your Content</button>
        <p>Add Your Article</p>
        <form onSubmit={handleSubmit}>
            <div>
                <input type='text' name='title' placeholder='title' onChange={handleTitleInput} value={title}></input>
                <input type='text' name='summary' placeholder='summary' onChange={handleSummaryInput} value={summary}></input>
                <input type='text' name='text' placeholder='text' onChange={handleTextInput} value={text}></input>
                <input type='file' name='articleImage' onChange={handleImage} />
                {preview && <img src={preview} alt='' />}
            </div>
            <button type='submit' onClick={()=> setPhase('DRT')}>Save</button>
            <button type='submit' onClick={()=> setPhase('SUB')}>Save/Submit</button>
        </form>
    </div>
    )
}

export default CreateArticle

