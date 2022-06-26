import { useState } from "react"
import Wrapper from "../assets/wrappers/SingleRequest"
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const SingleRequest = ({ id, fromUser, toUser, fromDate, toDate, message, createdAt, numberOfNights, status, requestType }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Link className="link" to={`/request/${id}`} >
      <Wrapper>
        <div className="request">

          {
            requestType === 'received' &&
            <>
              <span className="name">{fromUser?.name} </span>
              <span >{fromUser?.country} / {fromUser?.city}</span>
              <span >{fromUser?.age}</span>
              <span>from {fromDate?.slice(0, 10)}</span>
              <span>to {toDate?.slice(0, 10)}</span>
              <span>{numberOfNights} nights </span>
              <div className={`status ${status}`}>
                {/* {status === 'pending' && <AiOutlineCloseCircle className="decline" />} */}
                <span>{status} </span>
                {/* {status === 'pending' && <AiOutlineCheckCircle className="accept" />} */}
              </div>
            </>
          }

          {
            requestType === 'sent' &&
            <>
              <span className="name">{toUser?.name} </span>
              <span >{toUser?.country} / {toUser?.city}</span>
              <span >{toUser?.age}</span>
              <span>from {fromDate?.slice(0, 10)}</span>
              <span>to {toDate?.slice(0, 10)}</span>
              <span>{numberOfNights} nights </span>
              <div className={`status ${status}`}>
                <span>{status} </span>
              </div>
            </>


          }




        </div>
        {
          showDetails &&
          <div className="request-details" onClick={() => setShowDetails(false)}>

            <span>{message}</span>
            {status === 'pending' && requestType === 'received' &&
              <div className="icons">
                <AiOutlineCloseCircle className="decline" />
                <AiOutlineCheckCircle className="accept" />
              </div>
            }
          </div>
        }



      </Wrapper>
    </Link>
  )
}

export default SingleRequest