import { configureStore } from "@reduxjs/toolkit";
import allProductSlice from "./feature/allProduct-slice";
import cartSlice from "./feature/cart-slice";
import cart2Slice from "./feature/cart2-slice";
import editeModalSlice from "./feature/editModal-slice";
import EditProductSlice from "./feature/editProduct-slice";
import priceSlice from "./feature/price-slice";
import QuantitySlice from "./feature/quantity-slice";
import uiSlice from "./feature/ui-slice";

const store = configureStore({
  reducer: {
    products: cartSlice,
    ui: uiSlice.reducer,
    cart: cart2Slice.reducer,
    price: priceSlice.reducer,
    quantity: QuantitySlice.reducer,
    EditProduct: EditProductSlice.reducer,
    editModal:editeModalSlice.reducer,
    allProduct:allProductSlice.reducer
  }
});

export default store;
