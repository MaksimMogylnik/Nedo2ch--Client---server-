async function GetToken(email, password) {
    const credentials = {
        email: email,
        password: password
    }

    var tokenKey = "accessToken"

    const response = await fetch('https://localhost:44384/Account/Token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })

    const data = await response.json()
    if (response.ok === true) {
        sessionStorage.setItem(tokenKey, data.access_token)
    } else {
        console.log(response.status, data.errorText)
    }
}

export default GetToken