import { useState } from "react"

async function CreateAccount(email, password) {
    const credentials = {
        email: email,
        password: password
    }

    const response = await fetch('https://localhost:44384/Account/Register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })

    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
        alert("Success")
    } else {
        alert("Error")
    }
}

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <div className="d-flex p-5 gap-3 flex-column" style={{ width: '500px' }}>

            <input className="form-control" type="email" placeholder="Email" onChange={(e) => (setEmail(e.target.value))}></input>
            <input className="form-control" type="password" placeholder="Password" onChange={(e) => (setPassword(e.target.value))}></input>
            <button className="btn btn-secondary" onClick={async () => {
                await CreateAccount(email, password)
            }}>Register</button>

        </div>
    )

}

export default Register