import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import reducer from './reducers'
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_ERROR,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_ERROR,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
    INCREASE_SKIP,
    DECREASE_SKIP,
    RESET_SKIP,
    GET_SINGLE_USER_BEGIN,
    GET_SINGLE_USER_SUCCESS,
    GET_COMMENTS_SUCCESS,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_ERROR,
    SHOW_REQUEST_COMPONENT,
    HIDE_REQUEST_COMPONENT,
    CHANGE_FILTER,
    GET_REQUESTS_BEGIN,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_ERROR,
    RESPONDE_REQUEST_SUCCESS,
    RESPONDE_REQUEST_ERROR



} from './actions'

const user = sessionStorage.getItem('user')
const token = sessionStorage.getItem('token')

const initialState = {
    showAlert: false,
    alertText: '',
    alertType: '',
    isLoading: false,
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    comments: [],
    users: [],
    singleUser: {},
    totalUsers: 0,
    numOfPages: 0,
    page: 1,
    skip: 0,
    showRequestForm: false,
    filter: '',
    requests: [],

}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    // axios
    const authFetch = axios.create({
        baseURL: '/api/v1'
    })

    // request
    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // response
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error?.response?.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )





    const displayAlert = (alertType, alertText) => {
        dispatch({
            type: DISPLAY_ALERT,
            payload: {
                alertType,
                alertText
            }
        })
        clearAlert()
    }


    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }


    // dont skip to update variable names
    const addUserToLocalStorage = ({ user, token }) => {
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('token', token)
    }
    const removeUSerFromLocalStorage = () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        try {
            const { data } = await axios.post(`/api/v1/users/${endPoint}`, currentUser)
            const { user, token } = data
            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, alertText } })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            dispatch({ type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg } })
        }
        clearAlert()
    }


    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUSerFromLocalStorage()
        clearAlert()
    }

    const updatePassword = async (passwords) => {
        const { password, confirmPassword } = passwords
        try {
            const passwordsMatch = password === confirmPassword
            if (passwordsMatch) {
                const { data } = await authFetch.patch('/users/updateProfile', { password })
                const { user, token } = data
                console.log(user);
                dispatch({
                    type: UPDATE_PASSWORD_SUCCESS,
                    payload: { user, token },
                })
            } else {
                dispatch({
                    type: UPDATE_PASSWORD_ERROR,
                    payload: { msg: "Passwords do not match!" },
                })
            }
        } catch (error) {
            if (error?.response?.status !== 401) {
                dispatch({
                    type: UPDATE_PASSWORD_ERROR,
                    payload: { msg: error?.response?.data?.msg },
                })
            }
        }
        clearAlert()
    }

    const updateProfile = async (currentUser) => {
        try {
            const { data } = await authFetch.patch('/users/updateProfile', currentUser)
            const { user, token } = data

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, token },
            })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            if (error?.response?.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error?.response?.data?.msg },
                })
            }
        }
        clearAlert()
    }

    const updateAvatar = async (formData) => {
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            const { data } = await authFetch.post('/users/avatar', formData)
            dispatch({
                type: UPDATE_AVATAR_SUCCESS,
            })
            clearAlert()
        } catch (error) {
            dispatch({
                type: UPDATE_AVATAR_ERROR,
                payload: { msg: error?.response?.data?.msg },
            })

        }
    }

    const getAvatar = async () => {
        const avatar = await authFetch(`/api/v1/users/${user._id}/avatar`)
    }

    const increaseSkip = () => {
        dispatch({ type: INCREASE_SKIP })
    }
    const decreaseSkip = () => {
        dispatch({ type: DECREASE_SKIP })
    }
    const resetSkip = () => {
        dispatch({ type: RESET_SKIP })
    }

    const getSingleUSer = async (id) => {
        let url = `/users/profile?id=${id}`
        dispatch({ type: GET_SINGLE_USER_BEGIN })
        try {
            const { data } = await authFetch(url)
            dispatch({
                type: GET_SINGLE_USER_SUCCESS,
                payload: {
                    data
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
    const createComment = async (id, comment) => {
        let url = `/comments?commentText=${comment}&id=${id}`
        try {
            const { data } = await authFetch.post(url)
            dispatch({
                type: GET_COMMENTS_SUCCESS,
                payload: {
                    data
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
    const getComments = async (id) => {
        let url = `/comments?id=${id}`
        try {
            const { data } = await authFetch(url)
            dispatch({
                type: GET_COMMENTS_SUCCESS,
                payload: {
                    data
                }
            })
        } catch (error) {
            console.log(error);
        }

    }

    const getUsers = async (values) => {

        dispatch({ type: GET_USERS_BEGIN })
        const updates = Object.keys(values)

        let url = `/users?limit=10&skip=${state.skip}`
        updates?.map(update => {
            return url += `&${update}=${values[update]}`
        })

        try {
            const { data } = await authFetch(url)
            const { users, totalUsers, numOfPages, skip } = data
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: {
                    users,
                    totalUsers,
                    numOfPages,
                    skip
                },
            })
        } catch (error) {
            console.log(error);
        }
        clearAlert()
    }

    const createRequest = async (fromUser, toUser, fromDate, toDate, message, numberOfNights) => {
        let url = `/requests?fromUser=${fromUser}&toUser=${toUser}&fromDate=${fromDate}&toDate=${toDate}&message=${message}&numberOfNights=${numberOfNights}`
        try {
            const { data } = await authFetch.post(url)
            dispatch({
                type: CREATE_REQUEST_SUCCESS,
                payload: {
                    data
                }
            })
        } catch (error) {
            dispatch({
                type: CREATE_REQUEST_ERROR,
                payload: { msg: error?.response?.data?.msg },
            })
        }
        clearAlert()
    }

    const showRequestComponent = () => {
        dispatch({
            type: SHOW_REQUEST_COMPONENT,
        })
    }
    const hideRequestComponent = () => {
        dispatch({
            type: HIDE_REQUEST_COMPONENT,
        })
    }

    const changeFilter = (filter) => {
        dispatch({
            type: CHANGE_FILTER,
            payload: {
                filter
            }
        })
    }

    const getRequests = async (type, status) => {
        let url = `/requests?type=${type}&status=${status}`
        try {

            const { data } = await authFetch(url)
            dispatch({
                type: GET_REQUESTS_BEGIN,
            })
            dispatch({
                type: GET_REQUESTS_SUCCESS,
                payload: {
                    data
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const respondRequest = async (id, status) => {
        let url = `/requests/respond?id=${id}&status=${status}`
        console.log(url);

        try {
            const { data } = await authFetch.post(url)
            dispatch({
                type: RESPONDE_REQUEST_SUCCESS,
            })
        } catch (error) {
            dispatch({
                type: RESPONDE_REQUEST_ERROR,
                payload: { msg: error?.response?.data?.msg }
            })
        }

    }


    return <AppContext.Provider value={{ ...state, removeUSerFromLocalStorage, displayAlert, setupUser, logoutUser, updateProfile, updateAvatar, updatePassword, getUsers, increaseSkip, decreaseSkip, resetSkip, getSingleUSer, getComments, createComment, showRequestComponent, hideRequestComponent, createRequest, changeFilter, getRequests, respondRequest }} >
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }