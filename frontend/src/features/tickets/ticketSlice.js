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

// Thunk: send to/return from api created ticket or err msg
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticket, thunkAPI) => {
    try {
      // get auth token from state, pass to service, return ticket obj
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticket, token);
    } catch (err) {
      // prettier-ignore
      const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString();
      console.log('err.response: ', err.response);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: fetch/return user's tickets arr or err
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      // get token from state, pass to service, return tickets
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
    } catch (err) {
      // prettier-ignore
      const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString();
      console.log('err.response: ', err.response);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: fetch ticket by id or err
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      // get token from state, pass to service, return ticket obj
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (err) {
      // prettier-ignore
      const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString();
      console.log('err.response: ', err.response);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: close ticket by id
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      // get user auth token from state
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (err) {
      // prettier-ignore
      const message = (err.response && err.response.data && err.response.data.message) ||
        err.message || err.toString();
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
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
