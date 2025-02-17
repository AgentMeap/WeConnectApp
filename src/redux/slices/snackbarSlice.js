import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: null,
  type: 'success',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    //mở snackbar
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    // action creator => function ||| action { type, payload } => openSnackbar({ message: 'Good Job'}) => action { type: 'snackbar/openSnackbar', payload: { message: 'Good Job' }}
    //đóng snackbar
    closeSnackbar: () => {
      return initialState;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
