import {testAssignmentAPI} from "../api/api"

const initialState = {
    users: [],
    request: {
        name: '',
        email: '',
        phone: '',
        position_id: 1,
        photo: {name: 'Upload your photo'}
    },
    isSubmitting: false,
    isSuccessfullyRegistered: false,
    isInitialized: 'loaded'
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET-USERS':
            return {...state, users: action.usersData}
        case 'SET-USER':
            return {...state, request: action.userData}
        case 'IS-SUBMITTING':
            return {...state, isSubmitting: action.isSubmit}
        case 'IS-SUCCESSFULLY-REGISTERED':
            return {...state, isSuccessfullyRegistered: action.isRegistered}
        case 'IS-INITIALIZED':
            return {...state, isInitialized: action.isInit}
        default:
            return state
    }
}

export const getUsersTC = (numUsers) => (dispatch) => {
    //initial getting users
    dispatch(setIsInitializedAC('load-users'))
    testAssignmentAPI.getUsers(numUsers)
        .then((res) => {
            dispatch(setUsersDataAC(res.data.users))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsInitializedAC('loaded'))
        })
}

export const newUserDataTC = (request) => (dispatch) => {
    //create new account
    const {name, email, phone, position_id, photo} = request
    dispatch(setIsInitializedAC('load-set-user'))
    testAssignmentAPI.getToken()
        .then((res) => {
            let formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("phone", phone)
            formData.append("position_id", position_id)
            formData.append("photo", photo)
            testAssignmentAPI.setUsers(formData, res.data.token)
                .then(() => {
                    testAssignmentAPI.getUsers(6)
                        .then((response) => {
                            dispatch(setUsersDataAC(response.data.users))
                            dispatch(setIsSuccessfullyRegisteredAC(true))
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                        .finally(() => {
                            dispatch(setIsInitializedAC('loaded'))
                        })
                })
                .catch((err) => {
                    dispatch(setIsInitializedAC('loaded'))
                    alert(err.response.data.message)
                })
        })
        .catch((err) => {
            dispatch(setIsInitializedAC('loaded'))
            console.log(err)
        })
}

export const setUsersDataAC = (usersData) => ({type: 'GET-USERS', usersData})
export const setNewUserDataAC = (userData) => ({type: 'SET-USER', userData})
export const setIsSubmittingAC = (isSubmit) => ({type: 'IS-SUBMITTING', isSubmit})
export const setIsSuccessfullyRegisteredAC = (isRegistered) => ({type: 'IS-SUCCESSFULLY-REGISTERED', isRegistered})
export const setIsInitializedAC = (isInit) => ({type: 'IS-INITIALIZED', isInit})