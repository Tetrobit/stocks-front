import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cbrService } from '../../service/cbr';

export const loadOn = createAsyncThunk(
  'loading.on',
  (timeout: number, _thunkAPI) => new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, timeout);
  })
);

export const loadOff = createAsyncThunk(
  'loading.off',
  (timeout: number, _thunkAPI) => new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, timeout);
  })
);

interface CbrState {
  loading: boolean;
};

const initialState: CbrState = {
  loading: false,
};

let counter = 0;

const loadingSlice = createSlice({
  name: 'loading',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadOff.fulfilled, (state, _action) => {
        counter = Math.max(0, counter - 1);
        if (counter === 0) {
          state.loading = false;
        }
      })
      .addCase(loadOn.fulfilled, (state, _action) => {
        counter = Math.max(0, counter - 1);
        if (counter === 0) {
          state.loading = false;
        }
      })
      .addCase(loadOn.pending, (state, _action) => {
        counter += 1;
        state.loading = true;
      })
  },
});

export const {} = loadingSlice.actions;
export default loadingSlice.reducer;