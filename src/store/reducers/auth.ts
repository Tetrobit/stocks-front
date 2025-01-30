import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../container/service/auth';

export const checkAuth = createAsyncThunk(
  'auth/check',
  async () => {
    return await authService.check();
  }
);

export const auth = createAsyncThunk(
  'auth',
  async (data, _thunkApi) => {
    return await authService.auth(data);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    first_name: '',
    last_name: '',
    photo: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = action.payload ? 'authorized' : 'guest';
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'guest';
      })
      .addCase(auth.pending, (state) => {
        state.status = 'authorizing';
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.status = action.payload ? 'authorized' : 'guest';
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
        state.photo = action.payload.photo;
      })
      .addCase(auth.rejected, (state, action) => {
        state.status = 'guest';
      });
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;