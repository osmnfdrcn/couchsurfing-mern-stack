import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import axios from "axios";

const ProfileAvatar = ({ setShowGeneralInfo, setShowHostingInfo, setShowAvatar }) => {
  const { user, updateAvatar, displayAlert, showAlert } = useAppContext();

  const [photo, setPhoto] = useState('');
  const [preview, setPreview] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('avatar', photo);
    updateAvatar(formData)
    setTimeout(() => {
      setShowGeneralInfo(false)
      setShowHostingInfo(false)
      setShowAvatar(false)
    }, 1000)

  }
  const handleChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPhoto('')
      return
    }
    setPhoto(e.target.files[0]);
  }

  useEffect(() => {
    if (!photo) {
      setPreview(undefined)
      return
    }
    if (photo.size > 1000000) { displayAlert('error', "Max file size is 1MB") }
    const objectUrl = URL.createObjectURL(photo)
    setPreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])


  return (
    <div className="avatar-update">
      <div className="avatar">
        {/* FIX THIS */}
        {!photo && <img src={`/api/v1/users/${user._id}/avatar`} alt="avatar" />}
        {photo && <img src={preview} />}
      </div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input
          type="file"
          name="avatar"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange} />

        <button
          type="submit"
          className="update-btn"
          disabled={!photo || photo?.size > 1000000}
        >Send</button>
      </form>
    </div>
  )
}

export default ProfileAvatar