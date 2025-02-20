import { useUserInfo } from '@hooks/useUserInfo';
import { Avatar, TextField } from '@mui/material';
import { openDialog } from '@redux/slices/dialogSlice';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

export const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);

    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: '.jpg,.jpeg,.png',
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
      <div>
        <p>{image?.name}</p>
      </div>
    </div>
  );
};

const PostCreation = () => {
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 rounded bg-white p-4 shadow">
      <Avatar className="!bg-primary-main">
        {userInfo?.fullName?.[0]?.toUpperCase()}
      </Avatar>
      <TextField
        className="flex-1"
        size="small"
        placeholder="What's on your mind?"
        onClick={() =>
          dispatch(
            openDialog({
              title: 'Example Title',
              contentType: 'NEW_POST_DIALOG',
              additionalData: userInfo,
            }),
          )
        }
      />
    </div>
  );
};
export default PostCreation;
