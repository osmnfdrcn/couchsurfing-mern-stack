import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext'
import { useNavigate, useParams } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RequestDetails'
import Alert from '../components/Alert'

const RequestDetails = () => {
  const { requests, user, respondRequest, showAlert } = useAppContext()
  const { id } = useParams()
  let navigate = useNavigate();
  const [requestType, setRequestType] = useState('')
  const request = requests?.filter((r) => r._id === id)
  const { createdAt, fromDate, fromUser, message, numberOfNights, status, toDate, toUser, updatedAt, __v, _id } = request[0]

  useEffect(() => {
    if (fromUser.id === user._id) { setRequestType('sent') }
    if (toUser.id === user._id) { setRequestType('received') }
  }, [])

  const handleResponde = (status) => {
    respondRequest(id, status)
    navigate(-1);
  }
  return (
    <div className='common-layout'>
      <Wrapper>

        {
          requestType === 'received' &&
          <div className='avatar'>
            <img src={`http://localhost:5000/api/v1/users/${fromUser.id}/avatar`} alt="avatar" />
            <span className={`status ${status}`}>{status}</span>
          </div>
        }
        {
          requestType === 'sent' &&
          <div className='avatar'>
            <img src={`http://localhost:5000/api/v1/users/${toUser.id}/avatar`} alt="avatar" />
            <span className={`status ${status}`}>{status}</span>

          </div>
        }
        <div className='details'>
          {
            requestType === 'received' &&
            <>
              <span className='name'>{fromUser?.name} / {fromUser?.age}</span>
              <span className='location'>{fromUser?.country} / {fromUser?.city}</span>
            </>
          }

          {
            requestType === 'sent' &&
            <>
              <span className='name'>{toUser?.name} / {toUser?.age}</span>
              <span className='location'>{toUser?.country} / {toUser?.city}</span>
            </>
          }
          <span className='dates'>from {fromDate.slice(0, 10)} to {toDate.slice(0, 10)}</span>
          <span className='nights'>{numberOfNights} nights</span>
          <p className='message'>{message}</p>


          {
            requestType === 'received' && status === 'pending' &&
            <div className='buttons'>
              <span onClick={() => handleResponde('accepted')} className='accept'>ACCEPT</span>
              <span onClick={() => handleResponde('declined')} className='decline'>DECLINE</span>

            </div>
          }
        </div>
      </Wrapper>
    </div>
  )
}

export default RequestDetails