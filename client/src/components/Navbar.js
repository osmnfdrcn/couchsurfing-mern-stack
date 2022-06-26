import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'
import Wrapper from '../assets/wrappers/Navbar';
import { useState } from 'react';

const Navbar = () => {
    const { logoutUser } = useAppContext();
    const [showLogout, setShowLogout] = useState(false)



    return (
        <Wrapper>
            <div>
                <NavLinks />
            </div>
            <div onClick={() => setShowLogout(!showLogout)} className='avatar'>

                <img src="https://pbs.twimg.com/media/EoGBGgnXcAMU1rB.jpg" alt="user" />
                {
                    showLogout &&
                    <div className='avatar-menu'>
                        <ul>
                            <li onClick={logoutUser}>Logout</li>
                        </ul>
                    </div>
                }

            </div>


        </Wrapper>
    )
}

export default Navbar