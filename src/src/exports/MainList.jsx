import React, {useState, useEffect} from "react";
import GetArticles from "../blogController/GetArticles";
import CreateCard from "../viewFunctions/CreateCard";
import Register from '../userController/Register';
import GetToken from "../userController/GetToken";

function Mainlist()
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        GetArticles().then(x => {setData(x); setIsLoaded(true)});
    }, [])

    if(isLoaded){

      if(flag === false){
        data.reverse()
        setFlag(true)
      }

        console.log(data);
        return(
         <div className="container" style={{width: 100 + '%', height: 100 + '%'}}>

         <div className="d-flex p-5 gap-3 flex-row">
           <Register/>
           <div id="loginForm" className="d-flex p-5 gap-3 flex-column" style={{ width: '500px' }}>
             <input className="form-control" type="email" placeholder="Email" onChange={(e) => (setEmail(e.target.value))} />
             <input className="form-control" type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))} />
             <button className="btn btn-secondary" id="submitLogin" onClick={async () => {
                     await GetToken(email, password)
                     window.location.reload();
                 }}> Login </button>
           </div>
         </div>
     
         <h1>Our Articles</h1>
     
         <div id="errors" className="alert alert-danger" style={{display: 'none'}}></div>
     
         <div className="d-flex p-5 gap-3 flex-column"  style={{width: 75 + '%'}}>
            {data.map((blog) => <CreateCard article={blog} key={blog.articleId}/>)}
         </div>
     </div>
   );
}
   else
   return (<></>);
}

export default Mainlist