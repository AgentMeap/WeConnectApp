import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  title: '',
  contentType: null,
  maxWidth: 'xs',
  fullWidth: true,
  actions: null,
  additionalData: {},
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      return {
        ...state,
        open: true,
        ...action.payload,
      };
    },
    closeDialog: () => initialState,
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
