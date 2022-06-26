import Wrapper from "../assets/wrappers/SingleUser"
import { useParams } from 'react-router-dom'
import { useAppContext } from "../context/appContext"
import { useEffect, useState } from "react"
import SingleComment from "./SinngleComment"
import DataField from "./DataField"
import RequestForm from "./RequestForm"

const SingleUser = () => {
  const { getSingleUSer, singleUser, getComments, createComment, comments, showRequestComponent, showRequestForm } = useAppContext()
  const { id } = useParams()
  const [showInfo, setShowInfo] = useState(false)
  const [showHosting, setShowHosting] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')


  const { name, age, hosting, country, city, rules, countriesVisited } = singleUser

  const handleSubmit = (e) => {
    e.preventDefault()
    createComment(id, comment)
    setComment('')
  }

  useEffect(() => {
    getSingleUSer(id)
    getComments(id)
    // eslint-disable-next-line
  }, [])


  return (
    <Wrapper>
      <div className="common-layout user-layout">
        <div className="user-avatar">
          <img src={`data:image/gif;base64,${singleUser?.avatar}`} alt="avatar" />
          <span
            onClick={showRequestComponent}
            className="request-btn">Make a Request</span>
        </div>
        <div className="user-info">
          <p className="heading" onClick={() => setShowInfo(!showInfo)} >INFO</p>
          {showInfo &&
            <div className="info">
              <DataField
                labelText='Name'
                value={name}
              />
              <DataField
                labelText='City'
                value={city}
              />
              <DataField
                labelText='Country'
                value={country}
              />
              <DataField
                labelText='Age'
                value={age}
              />

              <div className="data">
                <span className="key ">Countries Visited</span>
                <div className="liste">
                  {
                    countriesVisited.map((country, i) => {
                      return (
                        <span key={i} className="value countries">{country}</span>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          }

          <p className="heading" onClick={() => setShowHosting(!showHosting)}>HOSTING</p>
          {
            showHosting &&
            <div className="hosting">
              <DataField
                labelText='Minimum Age'
                value={hosting?.prefAgeStart}
              />
              <DataField
                labelText='Max Age'
                value={hosting?.prefAgeEnd}
              />
              <DataField
                labelText='Max Nights'
                value={hosting?.maxNights}
              />

              <div className="data">
                <span className="key ">Rules</span>
                <div className="liste">
                  {
                    rules.map((rule, i) => {
                      return (
                        <span key={i} className="value rules">{rule}</span>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          }

          <p className="heading" onClick={() => setShowComments(!showComments)}>COMMENTS</p>
          {
            showComments &&
            <div className="comments">
              <form onSubmit={handleSubmit} className="leave-comment">
                <textarea onChange={(e) => setComment(e.target.value)} value={comment}> Leave your comment</textarea>
                <button disabled={!comment} className="btn" type="submit">Send</button>

              </form >
              {
                comments?.map((comment, i) => {
                  return (
                    <div className="single-comment">
                      <SingleComment
                        key={i}
                        id={comment?._id}
                        from={comment?.from}
                        createdAt={comment?.createdAt}
                        commentText={comment?.commentText}
                      />
                    </div>
                  )
                })
              }
            </div>
          }
        </div>

      </div>

      {showRequestForm &&
        <RequestForm
          toUser={id}

        />}
    </Wrapper >
  )
}

export default SingleUser