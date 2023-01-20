import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const holidaysThunk = createAsyncThunk('holidays/holidaysThunk', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide');
    return response.data;
  } catch (error) {
    const errors = error instanceof AxiosError ? error?.response?.data?.errors : {};
    return thunkAPI.rejectWithValue(errors);
  }
});
