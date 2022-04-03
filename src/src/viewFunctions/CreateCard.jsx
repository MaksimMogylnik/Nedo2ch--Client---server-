import { Link } from "react-router-dom"

function CreateCard(props) {

    const stringTo = `/Article/${props.article.articleId}`
    return(
        <div className="card mb-3" id={props.article.articleId} style={{Width: 350 + 'px'}}>
            <Link to = {stringTo}>
            <div className="row g-0">
                <div style = {{width: 20 + '%', height: 150 + 'px'}}>
                    <img src={props.article.articleTopicPicture} style = {{width: 100 + '%', height: 100 + '%'}}></img>
                </div>
                <div style = {{width: 80 + '%', height: 150 + 'px', paddingLeft: 15 + 'px', paddingTop: 20 + 'px'}}>
                    <h5 className="card-title">{props.article.articleTopic}</h5>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default CreateCard