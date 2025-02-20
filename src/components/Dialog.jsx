import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MUIDialog,
  TextareaAutosize,
} from '@mui/material';
import { closeDialog } from '@redux/slices/dialogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUploader } from './PostCreation';

const NewPostDialogContent = ({ userInfo }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar className="!bg-primary-main" sx={{ width: 32, height: 32 }}>
          {userInfo?.fullName?.[0]?.toUpperCase()}
        </Avatar>
        <p className="font-bold">{userInfo.fullName}</p>
      </div>
      <TextareaAutosize
        minRows={3}
        placeholder="What's on your mind"
        className="mt-4 w-full p-2"
      ></TextareaAutosize>
      <ImageUploader />
    </div>
  );
};

const DynamicContent = ({ contentType, additionalData }) => {
  switch (contentType) {
    case 'NEW_POST_DIALOG':
      return <NewPostDialogContent userInfo={additionalData} />;
    default:
      return <p></p>;
  }
};

const Dialog = () => {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  return (
    <MUIDialog
      open={dialog.open}
      maxWidth={dialog.maxWidth}
      fullWidth={dialog.fullWidth}
      onClose={() => dispatch(closeDialog())}
    >
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>
        <DynamicContent
          contentType={dialog.contentType}
          additionalData={dialog.additionalData}
        ></DynamicContent>
      </DialogContent>
      <DialogActions>
        <Button>{dialog.actions}</Button>
      </DialogActions>
    </MUIDialog>
  );
};
export default Dialog;
