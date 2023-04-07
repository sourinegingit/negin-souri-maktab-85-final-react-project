import { createSlice } from "@reduxjs/toolkit";

const QuantitySlice=createSlice({
    name:"quantity",
    initialState:{quantityList:[]},
    reducers:{
        getQuantity(state,action){
            const editList2=[...state.quantityList]
            const filterList=editList2.filter(item=>item.id!==action.payload.id)
            state.quantityList=[...filterList,action.payload]
        }
    }
})
export const {getQuantity}=QuantitySlice.actions
export default QuantitySlice