import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'



const SharedLayout = () => {
    return (
        <main className='dashboard'>
            <div>
                <Navbar />
                <div>
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default SharedLayout