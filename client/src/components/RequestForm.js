import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppContext } from '../context/appContext';
import Alert from '../components/Alert'

const RequestForm = ({ setShowRequestForm, toUser }) => {
  const { user, createRequest, showAlert, displayAlert, hideRequestComponent } = useAppContext()
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [message, setMessage] = useState('')
  const fromUser = user._id

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimeout(() => {
      hideRequestComponent()
    }, 3000)
  }
  const handleRequest = () => {
    createRequest(fromUser, toUser, fromDate, toDate, message, numberOfNights)
  }
  const numberOfNights = (toDate - fromDate) / (1000 * 3600 * 24);

  return (

    <div className="request-form">
      {
        showAlert && <Alert />
      }
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="input-fields">
            <div className='dateIn'>
              <label htmlFor='dateIn'>From</label>
              <input onChange={(e) => setFromDate(e.target.valueAsDate)} type='date' name='dateIn' />
            </div>
            <div className='dateOut'>
              <label htmlFor='dateOut'>To</label>
              <input onChange={(e) => setToDate(e.target.valueAsDate)} type='date' name='dateOut' />
            </div>
          </div>
          <AiOutlineClose
            className="close"
            onClick={hideRequestComponent}
          />
        </div>

        <textarea onChange={(e) => setMessage(e.target.value)} value={message}>

        </textarea>
        <button
          onClick={handleRequest}
          className="btn"
          type="submit">Send</button>
      </form>
    </div>
  )
}

export default RequestForm