import { createSlice } from "@reduxjs/toolkit";

const priceSlice=createSlice({
    name:"price",
    initialState:{priceList:[]},
    reducers:{
        getPrice(state,action){
            const editList=[...state.priceList]
            const filterList=editList.filter(item=>item.id!==action.payload.id)
            state.priceList=[...filterList,action.payload]
        }
    }
})
export const {getPrice}=priceSlice.actions
export default priceSlice