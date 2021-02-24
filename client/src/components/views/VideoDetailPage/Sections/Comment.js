import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'

function Comment(props) {
    // 리덕스를 사용하여 user정보 가져오기
    const user = useSelector(state => state.user)
    // url에 있는 비디오 id 가져오기
    const videoId = props.postId

    const [CommentValue, setCommentValue] = useState("")

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result)
            } else {
                alert('코멘트 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists */}
            <SingleComment postId={videoId} />

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={ handleClick }
                    value={ CommentValue }
                    placeholder="코멘트를 작성해주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
