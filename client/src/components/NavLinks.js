import menuLinks from '../utils/menuLinks'
import { NavLink } from 'react-router-dom'

const NavLinks = () => {
    return (
        <div className='nav-links'>
            {menuLinks.map((link) => {
                const { text, path, id } = link

                return (
                    <NavLink
                        to={path}
                        key={id}
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                    >
                        {text}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default NavLinks
