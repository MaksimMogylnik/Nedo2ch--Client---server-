import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GetArticleById from "../blogController/GetArticleById";

function Article(){
    let { articleId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        GetArticleById(articleId).then(x => {setData(x); setIsLoaded(true)});
    })

    if(isLoaded === true)
    {
        return(
            <div className="container">
                <div className="d-flex flex-wrap p-3 m-3">
                <div className="m-3" style = {{width: 400 + 'px', height: 300 + 'px'}}>
                    <img src={data.articleTopicPicture} style = {{width: 100 + '%', height: 100 + '%'}}></img>
                </div>
                <div className="m-3">
                    <h5 className="card-title">{data.articleTopic}</h5>
                </div>
                </div>

                <div className="d-flex flex-wrap p-3 m-3">
                    <p>{data.articleContent}</p>
                </div>

            </div>
        )
    }

    return(
        <></>
    )
}

export default Article