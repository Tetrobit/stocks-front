import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cbrService } from '../../service/cbr';

export const getDaily = createAsyncThunk(
  'cbr',
  async () => {
    return await cbrService.getDaily();
  }
);

interface CbrState {
  daily_status: 'idle' | 'loading' | 'loaded' | 'failed';
  daily_course: {
    [id: string]: {
      name: string;
      value: string;
    }
  };
};

const initialState: CbrState = {
  daily_status: 'idle',
  daily_course: {
    'RUB': { name: 'Рубль', value: '1' },
  },
};

const authSlice = createSlice({
  name: 'cbr',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDaily.pending, (state) => {
        state.daily_status = 'loading';
      })
      .addCase(getDaily.fulfilled, (state, action) => {
        if (action.payload.ok) {
          const response = action.payload.response;
          state.daily_status = 'loaded';
          state.daily_course = {...state.daily_course, ...response};
        }
        else {
          state.daily_status = 'failed';
        }
      })
      .addCase(getDaily.rejected, (state, action) => {
        state.daily_status = 'failed';
      })
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;