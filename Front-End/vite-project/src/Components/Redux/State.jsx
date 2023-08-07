import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userRes:[],
    user:{
        name:"",
        email:"",
        id:"",
        token:""

    },
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
        }
    }
})
export const {userStoreData, userResData, userLogin} = eventReducers.actions
export default eventReducers.reducer