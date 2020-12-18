import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {storage} from '../firebase';
import './CreatePost.css'

function CreatePost() {
    const [caption, setCaption]=useState("")
    const [image, setImage] = useState("")
    const history = useHistory();
    const [photo, setPhoto] = useState("")
    
    const reader = new FileReader()
    const displayImage =(e) => {
        setPhoto(e.target.files[0])
        document.getElementById("preview").style.display="flex";
        reader.onloadend = (e) => {
            setImage(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleCreate = () => {
        var flag=1
        const uploadTask = storage.ref(`image/${photo.name}`).put(photo)
        uploadTask.on("state_changed", () => {
            storage.ref("image").child(photo.name).getDownloadURL()
            .then(url => {
                if (flag===1) {
                fetch("/createpost", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                    },
                    body: JSON.stringify({
                        caption,
                        photo: url,
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        toast(data.error)
                    } else {
                        toast("Post created Successfully !")
                        history.push('/home')
                    }
                }).catch(err => {
                    console.log(err)
                })
                flag=0
            }
            })
        })
        
    }

    return (
        <div>
            <NavBar />
            <ToastContainer />
            <div className="createpost">
                <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" placeholder="Caption" />
                <input type="file" id="fileinput" className="fileinput" onChange={displayImage}/>
                <label htmlFor="fileinput">Upload File</label>
                <img className="input_image" id="preview" src={image} 
                alt="" />
                <button type="submit" onClick={handleCreate}>Create Post</button>
            </div>
        </div>
    )
}

export default CreatePost
