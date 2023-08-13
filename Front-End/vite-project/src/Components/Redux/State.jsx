import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userRes:[],

    user:{
        name:"",
        email:"",
        id:"",
        token:"",
        login:false,
        profilePicture:""
    },

    userInitUpdate: [],

    userLogInData:[],

    allUser:[],
}

export const eventReducers = createSlice({
    name:"creativents",
    initialState,
    reducers:{
        userStoreData:(state, {payload})=>{
            state.user = payload
        },
        userResData:(state, {payload})=>{
            state.userRes = payload
        },
        userLogin:(state, {payload})=>{
            state.userLogInData = payload
        },
        userProfileUpdate:(state, {payload})=>{
            state.userInitUpdate = payload
        }
    }
})
export const {userStoreData, userResData, userLogin, userProfileUpdate} = eventReducers.actions
export default eventReducers.reducer