import React from 'react'
import Wrapper from '../assets/wrappers/SingleComment'

const SingleComment = ({ id, from, createdAt, commentText }) => {
  return (
    <Wrapper>
      <div className="comment" key={id}>
        <span> {from} | {createdAt.slice(0, 10)}</span>
        <span>{commentText}</span>

      </div>
    </Wrapper>
  )
}

export default SingleComment