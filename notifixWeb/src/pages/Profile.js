import React, {useEffect, useState} from 'react'
import {storage} from '../firebase';
import './Profile.css'
import NavBar from '../components/NavBar'

function Profile() {
    const [myPosts, setMyPosts] = useState([])
    const [url, setUrl] = useState("")

    useEffect(() => {
        fetch('/mydetails', {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                id: JSON.parse(localStorage.getItem("user"))._id
            })
        })
        .then(res=> res.json())
        .then(result => {
            setUrl(result.avatar)
        })
        fetch('/myposts', {
            method: "get",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then(res=> res.json())
            .then(posts => {
                setMyPosts(posts.myposts)
            })
    }, [url])

    const changeProfilePic = (e) => {
        var photo=e.target.files[0]
        const uploadTask = storage.ref(`image/${photo.name}`).put(photo)
        uploadTask.on("state_changed", () => {
            storage.ref("image").child(photo.name).getDownloadURL()
            .then(url => {
                fetch('/changepic', {
                    method: "put",
                    headers: {
                        'Content-Type': "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        id: JSON.parse(localStorage.getItem("user"))._id,
                        avatar: url
                    })
                })
                .then(res=>res.json())
                .then(result => {
                    setUrl(result.avatar)
                })
            })
        })
        
    }

    return (
        <div className="profile">
            <NavBar />
        <div className="profile_info">
            <img className="profile_pic" src={url} alt="" />
            <div className="profile_details">
                <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                <p><strong>{myPosts.length}</strong> posts</p>
                <br />
                <input type="file" id="fileinput" className="fileinput" onChange={changeProfilePic} />
                <label htmlFor="fileinput">Change Profile Pic</label>
            </div>
        </div>
        <center><h2>Your Posts</h2></center>
        <hr />
        <div className="gallery">
            {
                myPosts.map(post => {
                    return (
                    <img src={post.photo} alt="" />
                    )
                })    
            }
        </div>
        </div>
    )
}

export default Profile
