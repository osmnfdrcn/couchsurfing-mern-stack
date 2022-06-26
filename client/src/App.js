import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import Home from "./pages/Home";
import ProtectedRoute from './pages/ProtectedRoute';
import { useAppContext } from './context/appContext'
import Error from './pages/Error'
import {
  Profile,
  Requests,
  Search
} from './pages/Profile/index'
import SharedLayout from './pages/Profile/SharedLayout';

import { useState } from 'react';
import SingleUser from './components/SingleUser';
import RequestDetails from './pages/RequestDetails';

function App() {
  const { removeUSerFromLocalStorage } = useAppContext()
  // eslint-disable-next-line
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.addEventListener('load', (event) => {
      setLoaded(true)
    });
    // const removeLocalStorageData = window.addEventListener('onbeforeunload', removeUSerFromLocalStorage)

    return () => {
      return () => window.removeEventListener('onbeforeunload', removeUSerFromLocalStorage)
    }
    // eslint-disable-next-line 
  }, [])


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute >
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index path='me' element={< Profile />} />
          <Route path='requests' element={<Requests />} />
          <Route path='request/:id' element={<RequestDetails />} />
          <Route path='search' element={<Search />} />
          <Route path='user/:id' element={<SingleUser />} />
        </Route>

        <Route index path='login' element={<Home />} />
        <Route path='*' element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
