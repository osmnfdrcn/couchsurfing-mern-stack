import Wrapper from "../assets/wrappers/User"
import { Link } from 'react-router-dom'



const User = (user) => {
  const { name, id, city, avatar } = user
  return (
    <Link to={`/user/${id}`} >
      <Wrapper>
        <div className="user">
          <div className="user-avatar">
            <img src={`data:image/gif;base64,${avatar}`} alt="avatar" />
          </div>
          <div className="user-info">
            <span>{name}  |  {city} </span>
          </div>
        </div>

      </Wrapper>
    </Link >
  )
}

export default User