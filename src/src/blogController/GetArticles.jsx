function GetArticles(){
    var res =   fetch('https://localhost:44384/Article');
    return res.then(x =>{return x.json()}).then((x) => x);
}

export default GetArticles