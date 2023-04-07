import { createSlice } from "@reduxjs/toolkit";

const allProductSlice=createSlice({
    name:"allProduct",
    initialState:{allProduct:[]},
    reducers:{
        getAllProduct(state,action){
            state.allProduct=action.payload
        }
    }
})
export const {getAllProduct}=allProductSlice.actions
export default allProductSlice