import { createSlice } from "@reduxjs/toolkit";

const EditProductSlice=createSlice({
    name:"editProduct",
    initialState:{editItemList:[]},
    reducers:{
        getEditItem(state,action){
            state.list=[action.payload]
        }
    }
})
export const {getEditItem}=EditProductSlice.actions
export default EditProductSlice