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

    eventInfo:[],

    ticketQty : 0
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
        },
        eventData:(state, {payload})=>{
            state.eventInfo = payload
        },
        checkoutTicketQty:(state, {payload})=>{
            state.ticketQty = payload
        }
    }
})
export const {userStoreData, userResData, userLogin, userProfileUpdate, eventData, checkoutTicketQty} = eventReducers.actions
export default eventReducers.reducer