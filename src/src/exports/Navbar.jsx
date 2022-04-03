import { Link } from "react-router-dom"

function Navbar(){

    var tokenKey = "accessToken"

    if(sessionStorage.getItem(tokenKey) != undefined){

      console.log(sessionStorage.getItem(tokenKey))

        return (
            <nav className="navbar navbar-dark text-whitesmoke mb-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img src="https://pm1.narvii.com/7742/aaed199e7a96eae1fb88e1536c93631fcc7e8b3ar1-1078-1080v2_hq.jpg" alt="" width="77" height="60" className="d-inline-block align-text-top"/>
                <span className="ms-3 hdr">Welcome. Again.</span>
              </a>
              <Link className="btn btn-outline-dark" to='/'> Home </Link>
              <Link className="btn btn-outline-dark" to='/create'> Create Article </Link>
              <form className="d-flex">
                <label className="succ"> Logged In</label>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-dark" type="submit">Search</button>
              </form>
            </div>
          </nav>
        )
    }

    return (
        <nav className="navbar navbar-dark text-whitesmoke mb-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="https://pm1.narvii.com/7742/aaed199e7a96eae1fb88e1536c93631fcc7e8b3ar1-1078-1080v2_hq.jpg" alt="" width="77" height="60" className="d-inline-block align-text-top"/>
            <span className="ms-3 hdr">Welcome. Again.</span>
          </a>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-dark" type="submit">Search</button>
          </form>
        </div>
      </nav>
    )
  }

  export default Navbar