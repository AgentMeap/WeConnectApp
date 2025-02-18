import FormField from '@components/FormField';
import OTPInput from '@components/FormInputs/OTPInput';
import { Button, CircularProgress } from '@mui/material';
import { login } from '@redux/slices/authSlice';
import { openSnackbar } from '@redux/slices/snackbarSlice';
import { useVerifyOTPMutation } from '@services/rootApi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OTPVerifyPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
  });
  const location = useLocation();
  const [verifyOTP, { data, isLoading, isSuccess, isError, error }] =
    useVerifyOTPMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
    verifyOTP({ otp: formData.otp, email: location?.state?.email });
  };

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: 'error', message: error?.data?.message }));
    }
    if (isSuccess) {
      dispatch(login(data));
      navigate('/');
    }
  }, [isError, error, dispatch, isSuccess, data, navigate]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Two-Step Verification
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="otp"
          label="Type your 6 digit security code"
          control={control}
          Component={OTPInput}
        />

        <Button type="submit" variant="contained">
          {isLoading && (
            <CircularProgress size={16} className="mr-2"></CircularProgress>
          )}
          Verify my account
        </Button>
      </form>
      <p className="mt-4 text-center">
        Didn&apos;t get the code? <Link to="/login">Resend</Link>
      </p>
    </div>
  );
};
export default OTPVerifyPage;
