import React, {useState, useEffect} from "react";

async function PostArticle(articleTopic, articleTopicPicture, articeContent) {

    var tokenKey = "accessToken"

    const token = sessionStorage.getItem(tokenKey)

    const response = await fetch('https://localhost:44384/Article', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token, 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
            articleTopic: articleTopic,
            articleContent: articeContent,
            articleTopicPicture: articleTopicPicture
        })
    })

    if (response.ok === true) {
        alert("Success")
    } else {
        alert("Error")
    }
}

function CreateArticle() {

    const [articleTopic, setArticleTopic] = useState('')
    const [articleTopicPicture, setArticleTopicPicture] = useState('')
    const [articeContent, setArticeContent] = useState('')
    
    return (
        <div className="d-flex p-5 gap-3 flex-column" style={{ width: '500px' }}>

            <input className="form-control" type="text" placeholder="Topic (max 100 symbols)" onChange={(e) => (setArticleTopic(e.target.value))}></input>
            <input className="form-control" type="text" placeholder="Topic picture source" onChange={(e) => (setArticleTopicPicture(e.target.value))}></input>
            <textarea className="md-textarea form-control" rows="3" placeholder="Topic content" onChange={(e) => (setArticeContent(e.target.value))}></textarea>
            <button className="btn btn-secondary" onClick={async () => {
                await PostArticle(articleTopic, articleTopicPicture, articeContent)
            }}>Create</button>

        </div>
    )

}

export default CreateArticle
