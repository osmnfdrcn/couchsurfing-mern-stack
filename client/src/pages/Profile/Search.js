import Wrapper from "../../assets/wrappers/Search"
import User from "../../components/User"
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'

const Search = () => {
    const {
        getUsers,
        increaseSkip,
        decreaseSkip,
        resetSkip,
        users,
        numOfPages,
        page,
        skip,
        isLoading
    } = useAppContext()

    const [values, setValues] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        // varolan bir aramanin n.inci (n>1) sayfasindayken yeni bir arama yapildiginda skip degerini sifirliyoruz. 
        if (page > numOfPages) { resetSkip() }
        getUsers({ ...values })
        // eslint-disable-next-line
    }, [values, skip])

    // baska bir sayfaya gecip geri dondukten sonra onceki arama sonuclarinin sifirlanmasi icin. daha efektif bir cozum bul.
    useEffect(() => {
        resetSkip()
        // eslint-disable-next-line
    }, [])
    // eslint-disable-next-line
    const style = page > 1 ? 'pagination-btn' : 'disabled-btn pagination-btn'



    return (
        <Wrapper>
            <div className='search-container'>
                <form>
                    <input onChange={handleChange} name="city" type='text' placeholder="city" />
                    <input onChange={handleChange} name="minAge" type='number' placeholder="min age" />
                    <input onChange={handleChange} name="maxAge" type='number' placeholder="max age" />
                    <input onChange={handleChange} name="nights" type='number' placeholder="nights" />
                </form>
            </div>

            {
                isLoading
                    ? <Loading center />
                    : (
                        <div className='user-container'>
                            {
                                users?.map((user, id) => {
                                    return (
                                        <User
                                            key={id}
                                            name={user?.name.toLowerCase()}
                                            city={user?.city}
                                            avatar={user?.avatar}
                                            id={user?._id}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
            }

            <div className="pagination">
                <button
                    classsname='btn-disabled pagination-btn'
                    onClick={decreaseSkip}
                    disabled={page === 1}
                >Previous</button>
                <span>{page}/{numOfPages}</span>
                <button
                    classsname='btn pagination-btn'
                    onClick={increaseSkip}
                    disabled={page >= numOfPages}
                >Next</button>
            </div>
        </Wrapper>
    )
}

export default Search