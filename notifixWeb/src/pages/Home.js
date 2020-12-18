import React, {useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import {Avatar} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {useStateValue} from '../Redux/StateProvider'
import './Home.css'

function Home() {
    const [state, dispatch] = useStateValue();
    const [posts, setPosts] = useState([])
    // const [comment, setComment] = useState("")

    // console.log(state)

    useEffect(() => {
        fetch("/allposts", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.posts)
            setPosts(data.posts)
        })
    },[posts])

    const handleTrust = (id) => {
        console.log("Trust clicked")
        fetch("/trust", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
        })
        .catch(err => console.log(err))
    }

    const handleUntrust = (id) => {
        console.log("Untrust Clicked")
        fetch("/untrust", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
        })
        .catch(err => console.log(err))
    }

    const postComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                text,
                postId,
                poster: `${JSON.parse(localStorage.getItem("user")).name}`,
            })
        })
        .then(res=> res.json())
        .then(result=> {
            console.log(result)
            const newPost = posts.map(post=> {
                if(post._id==result._id) {
                    return result
                } else {
                    return post
                }
            })
            setPosts(newPost)
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="home">
            <NavBar />
            <div className="home_content">
                <div className="home_posts">
            {
                posts.map(post => { var time=new Date();
                    var before=time.getTime()-post.timeStamp
                    before=before/1000
                    before=before/60
                    if (before<1) {
                        var time_before=`a few seconds ago`
                    }
                    else if (before>1440) {
                        var time_before=`${parseInt(before/1440)} days ago`
                    } else if (before>60) {
                        var time_before=`${parseInt(before/60)} hours ago`
                    } else {
                        var time_before=`${parseInt(before)} minutes ago`
                    }
                return (<div className="post" key={post._id}>
                    <div className="post_header">
                        <Avatar className="post_user" src="" alt="" />
                        <h3>{post.postedBy.name}</h3>
                        <h3 className="TF">Trust Factor: {
                        (post.trust.length)/(post.untrust.length + 1)
                        }</h3>
                    </div>
                    <img className="post_image" src={post.photo} alt="" />
                    <div className="post_footer">
                        <div className="validity">
                            {!post.trust.includes(JSON.parse(localStorage.getItem("user"))._id) ? 
                            <div className="trust_count" >
                                <CheckIcon /><p onClick={() => handleTrust(post._id)}>Trust</p>
                            </div>
                            : 
                            <>
                            </>
                            }
                            {!post.untrust.includes(JSON.parse(localStorage.getItem("user"))._id) ?
                            <div className="untrust_count">
                                <ClearIcon /><p onClick={() => handleUntrust(post._id)}>Untrust</p>
                            </div>
                            : 
                            <>
                            </>
                            }
                            <h4 className="total_count">Total Poll: {post.trust.length+post.untrust.length}</h4>
                        </div>
                        <p className="caption"><strong>{post.postedBy.name}</strong> {post.caption}</p>
                        <br />
                        <div>
                        {
                            post.comments.map(comment => {
                                return (<div className="comment" key={comment._id}>
                                    <h6 className="comment_user">{comment.poster}</h6>
                                    <p className="comment_text"> {comment.text}</p>
                                </div>
                                )
                            })
                        }
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            postComment(e.target[0].value, post._id)
                        }}>
                        <input type="text" placeholder="Share your Views..."/>
                        
                        </form>
                    </div>
                    <p className="timeStamp">{time_before}</p>
                </div>
                )
                })
            }
            </div>
            {/* <iframe src="https://www.euronews.com/embed/timeline" scrolling="no" className="news_feed"></iframe> */}
            </div>
        </div>
    )
}

export default Home
