import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/model';

export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  error: string;
}

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (isExist) {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      } else {
        state.products.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(init.rejected, (state) => {
      state.error = 'Oops... An error occured. Try to reload the page';
      state.loading = false;
    });
  },
});

export const { toggle } = productsSlice.actions;

export default productsSlice.reducer;

export const init = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
});
