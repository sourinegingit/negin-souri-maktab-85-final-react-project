import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/constants";
import axios from "axios";
const initialState = {
  products: [],
  loading: false,
  error: "",
  status: "",
  selectedTodo: {}
};

export const fetchTodos = createAsyncThunk("", async () => {
  try {
    const res = await axios.get(BASE_URL + "/products");
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const uploadImage = createAsyncThunk("", async (newImage) => {
  try {
    const frmData = new FormData();
    frmData.append("image", newImage);
    const res = await axios.post(BASE_URL + "/upload", frmData);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const creatProduct = createAsyncThunk("", async (productData) => {
  try {
    const frmData = new FormData();
    frmData.append("name", productData.name);
    frmData.append("image", productData.fileName);
    frmData.append("subcategory", productData.subcategory);
    frmData.append("thumbnail", productData.fileName);
    frmData.append("showOnHomePage", true);
    frmData.append("price", +productData.price);
    frmData.append("brand", productData.category);
    frmData.append("quantity", +productData.quantity);
    frmData.append("category", productData.category);
    frmData.append("description", productData.description);
    const res = await axios.post(BASE_URL + "/products", frmData);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const deleteProduct = createAsyncThunk("", async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/products/${id}`);
    return res;
  } catch (error) {
    return error.message;
  }
});

export const updateProduct = createAsyncThunk(
  "todos/updateTodo",
  async (currentTodo) => {
    try {
      const res = await axios.put(BASE_URL, currentTodo);
    
      return currentTodo
    } catch (error) {
      return error.message;
    }
  }
);

const cartSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSelectTodo(state, action) {
      state.selectedTodo = action.payload;
    }
  },
  extraReducers: (builder) => {
    // read
    builder.addCase(fetchTodos.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return { ...state, loading: false, products: action.payload };
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      return { ...state, loading: false, products: [], error: action.payload };
    });
    //   add
    // builder.addCase(creatProduct.pending, (state) => {
    //   return { ...state, loading: true };
    // });
    // builder.addCase(creatProduct.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     products: [...state.products, action.payload],
    //   };
    // });
    // builder.addCase(creatProduct.rejected, (state, action) => {
    //   return { ...state, loading: false, error: action.payload };
    // });
    //   // delete
    // builder.addCase(deleteProduct.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.products = state.products.filter(
    //     (todo) => todo.id !== action.payload
    //   );
    //   console.log(action.payload);
    // });
    //   // update
    //   builder.addCase(updateTodo.fulfilled,(state,action)=>{
    //     state.loading=false
    //     const index=state.products.findIndex((item)=>item.id==action.payload.currentTodo.id)
    //     state.products=state.products.splice(index,1,action.payload.currentTodo)
    // })
  }
});

export default cartSlice.reducer;
export const { setSelectTodo } = cartSlice.actions;
