import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../service/auth';

export const checkAuth = createAsyncThunk(
  'auth.check',
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

export const logout = createAsyncThunk(
  'auth.logout',
  async () => {
    return await authService.logout();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
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
        if (action.payload.ok) {
          const user = action.payload.response;
          state.status = 'authorized';
          state.id = user.id;
          state.first_name = user.first_name;
          state.last_name = user.last_name;
          state.photo = user.photo;
        }
        else {
          state.status = 'guest';
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'guest';
      })
      .addCase(auth.pending, (state) => {
        state.status = 'authorizing';
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.status = action.payload ? 'authorized' : 'guest';
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
        state.photo = action.payload.photo;
      })
      .addCase(auth.rejected, (state, action) => {
        state.status = 'guest';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'guest';
        state.first_name = "";
        state.last_name = "";
        state.photo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'guest';
      });
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;