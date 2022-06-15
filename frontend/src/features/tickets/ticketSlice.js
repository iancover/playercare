import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import services
import ticketService from './ticketService';

// Initial state
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Thunk to interact w/api
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticket, thunkAPI) => {
    try {
      // get user from state instead of localStorage using ThunkAPI
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createNewTicket(ticket, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      console.log('err.response: ', err.response);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
