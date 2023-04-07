import { createSlice } from "@reduxjs/toolkit";

const editeModalSlice=createSlice({
    name:"editeModal",
    initialState:{modalMood:false},
    reducers:{
        getEditModal(state,action){
            state.modalMood=action.payload
        }
    }
})
export const {getEditModal}=editeModalSlice.actions
export default editeModalSlice