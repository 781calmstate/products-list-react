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
  loading: true,
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
    sort: (state, action: PayloadAction<string>) => {
      const compareFn = (a: IProduct, b: IProduct) => {
        if (action.payload === 'name') {
          return a[action.payload].localeCompare(b[action.payload]);
        } else if (action.payload === 'count') {
          return b.count - a.count;
        }
        return 0;
      };
      state.products.sort(compareFn);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.error = 'Oops... An error occured. Try to reload the page';
      state.loading = true;
    });
  },
});

export const { toggle, sort } = productsSlice.actions;

export default productsSlice.reducer;

export const init = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('http://localhost:8080/products');
  const data = await response.json();
  return data;
});
