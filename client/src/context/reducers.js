import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    ACTIVATE_USER_ACCOUNT,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_ERROR,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_ERROR,
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

import { initialState } from './appContext'

const reducer = (state, action) => {

    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: action.payload.alertType,
            alertText: action.payload.alertText
        }
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        }
    }

    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText
        }
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg
        }
    }

    if (action.type === ACTIVATE_USER_ACCOUNT) {
        return {
            ...state,
            user: action.payload.data,
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            showAlert: true,
            alertType: 'error',
            alertText: "You are loggin out"
        }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'Updated!',
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }

    if (action.type === UPDATE_PASSWORD_SUCCESS) {
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'Password Updated!',
        }
    }
    if (action.type === UPDATE_PASSWORD_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }

    if (action.type === UPDATE_AVATAR_SUCCESS) {
        return {
            ...state,
            showAlert: true,
            alertType: 'success',
            alertText: 'Profile Photo Updated!',
        }
    }
    if (action.type === UPDATE_PASSWORD_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_SINGLE_USER_BEGIN) {
        return {
            ...state,
            singleUser: {},
            isLoading: true
        }
    }
    if (action.type === GET_SINGLE_USER_SUCCESS) {
        return {
            ...state,
            singleUser: action.payload.data,
            isLoading: false
        }
    }
    // Hata alirsak ne yapacagiz ki?
    // if (action.type === GET_SINGLE_USER_ERROR) {
    // }
    if (action.type === GET_USERS_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === GET_USERS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            users: action.payload.users,
            totalUsers: action.payload.totalUsers,
            numOfPages: action.payload.numOfPages,
        }
    }

    if (action.type === RESET_SKIP) {
        return {
            ...state,
            skip: 0,
            page: 1
        }
    }
    if (action.type === INCREASE_SKIP) {
        return {
            ...state,
            skip: state.skip + 10,
            page: state.page + 1
        }
    }
    if (action.type === DECREASE_SKIP) {
        return {
            ...state,
            skip: state.skip - 10,
            page: state.page - 1
        }
    }

    if (action.type === GET_COMMENTS_SUCCESS) {
        return {
            ...state,
            comments: action.payload.data
        }
    }


    if (action.type === CREATE_REQUEST_SUCCESS) {
        return {
            ...state,
            showAlert: true,
            alertType: 'success',
            alertText: 'Your request has been sent!'
        }
    }
    if (action.type === CREATE_REQUEST_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }

    if (action.type === SHOW_REQUEST_COMPONENT) {
        return {
            ...state,
            showRequestForm: true

        }
    }
    if (action.type === HIDE_REQUEST_COMPONENT) {
        return {
            ...state,
            showRequestForm: false

        }
    }

    if (action.type === CHANGE_FILTER) {
        return {
            ...state,
            filter: action.payload.filter
        }
    }
    if (action.type === GET_REQUESTS_BEGIN) {
        return {
            ...state,
            requests: []
        }
    }
    if (action.type === GET_REQUESTS_SUCCESS) {
        return {
            ...state,
            requests: action.payload.data
        }
    }

    if (action.type === RESPONDE_REQUEST_SUCCESS) {
        return {
            ...state,
            showAlert: true,
            alertType: 'success',
            alertText: 'Your response has been sent!'
        }
    }
    if (action.type === RESPONDE_REQUEST_ERROR) {
        return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
        }
    }


    throw new Error(`no such action  :  ${action.type}`)
}

export default reducer