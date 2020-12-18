import React, {useState} from 'react'
import logo from '../logo.png'
import {Link, useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {useStateValue} from '../Redux/StateProvider'
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

function Login() {
    const [state, dispatch] = useStateValue()

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("clicked")
        if (re.test(email)===false) {
            toast("Enter valid email address!")
        }
        else {
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                toast(data.error)
            } else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                toast("You are Logged In !")
                console.log(data.user)
                dispatch({
                    type: "SET_USER",
                    user: data.user,
                })
                history.push('/home')
                console.log(state)
            }
        }).catch(err => {
            console.log(err)
        })
        }
    }
    return (
        <div className="login">
            <ToastContainer />
            <img className="login_logo" src={logo} alt="logo" />
            <form className="login_form">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button onClick={handleLogin} type="submit">Login</button>
            </form>
            <div className="login_switch">
                <p>Don't Have an Account? </p>
                <Link to="/signup">SignUp</Link>
            </div>
        </div>
    )
}

export default Login
