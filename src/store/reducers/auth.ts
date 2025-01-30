import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../container/service/auth';

export const checkAuth = createAsyncThunk(
  'auth/check',
  async () => {
    return await authService.check();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
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
      });
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;