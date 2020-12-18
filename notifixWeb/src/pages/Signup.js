import React, {useState} from 'react'
import logo from '../logo.png'
import {Link, useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'

function SignUp() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("clicked")
        if (re.test(email)===false) {
            toast("Enter valid email address!")
        }
        else {
            fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                toast(data.error)
            } else {
                toast("You are Signed Up !")
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
        }
    }

    return (
        <div className="signup">
            <ToastContainer />
            <h1>Sign Up</h1>
            <img  className="signup_logo" src={logo} alt="logo" />
            <form className="signup_form">
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Username" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button onClick={handleSignup} type="submit">Sign Up</button>
            </form>
            <div className="signup_switch">
                <p>Already Have an Account? </p>
                <Link to="/">Login</Link>
            </div>
        </div>
    )
}

export default SignUp
