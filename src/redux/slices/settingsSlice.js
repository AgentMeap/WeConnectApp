import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowDrawer: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    //mở snackbar
    toggleDrawer: (state) => {
      state.isShowDrawer = !state.isShowDrawer;
    },
    // action creator => function ||| action { type, payload } => openSnackbar({ message: 'Good Job'}) => action { type: 'snackbar/openSnackbar', payload: { message: 'Good Job' }}
    //đóng snackbar
    closeSnackbar: () => {
      return initialState;
    },
  },
});

export const { toggleDrawer } = settingsSlice.actions;
export default settingsSlice.reducer;
