import React, { useContext, useState } from 'react'


import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { UserContext } from './context/context';






function Login() {
    const { user, setUser } = useContext(UserContext)
    console.warn(user)
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = new useNavigate()

    async function login() {
        let item = { username, password }
        let result = await fetch("http://localhost:9000/authenticate", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })
        result = await result.json();
        if (result.res === "0") {
            localStorage.setItem("user","0")
            navigate('/home', { state: { id: result.res } })
        }
        else if (result.res === "1") {
            localStorage.setItem("user","1")
            navigate('/home', { state: { id: result.res } })
            console.warn(localStorage.getItem("user"))
        }
        else {
            alert("incorrect credentials")
        }

    }
    return (

        <div>

            <div className="col-sm-5 offset-sm-0">
                <Form style={{ width: "80%", marginLeft: "10%", marginTop: "50%" }}>
                    <Form.Group>
                        <Form.Label>Enter your name</Form.Label>
                        <Form.Control placeholder="username" onChange={(e) => setusername(e.target.value)} className="form-control" /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter your password</Form.Label>
                        <input type='password'placeholder="password" onChange={(e) => setpassword(e.target.value)} className="form-control" /><br />
                    </Form.Group>
                    <Button onClick={login}>Login</Button>
                </Form>


            </div>
        </div>



















    )
}

export default Login
