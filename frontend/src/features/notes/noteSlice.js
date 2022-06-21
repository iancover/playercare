import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import noteService from './noteService';

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Thunk: Add note
export const addNote = createAsyncThunk(
  'notes/add',
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await noteService.addNote(noteText, ticketId, token);
    } catch (err) {
      // prettier-ignore
      const message = (err.response && err.response.data && err.response.data.message) ||
          err.message || err.toString();
      console.log('err.response: ', err.response);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk: Get all ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (err) {
      // prettier-ignore
      const message = (err.response && err.response.data && err.response.data.message) ||
          err.message || err.toString();
      console.log('err.response: ', err.response);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
