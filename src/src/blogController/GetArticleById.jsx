function GetArticleById(articleId) {
    const response = fetch(`https://localhost:44384/Article/${articleId}`)
    return response.then(x =>{return x.json()}).then((x) => x);
}

export default GetArticleById