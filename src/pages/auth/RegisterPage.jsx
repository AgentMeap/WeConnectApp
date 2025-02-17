import FormField from '@components/FormField';
import TextInput from '@components/FormInputs/TextInput';
import { Alert, Button } from '@mui/material';
import { openSnackbar } from '@redux/slices/snackbarSlice';
import { useRegisterMutation } from '@services/rootApi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();
  const [register, { data = {}, isLoading, error, isSuccess, isError }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onSubmit(formData) {
    console.log({ formData });
    register(formData);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate('/login');
    }
  }, [isSuccess, data.message, dispatch, navigate]);

  console.log({ data, isLoading, error });

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="fullName"
          label="Full Name"
          control={control}
          Component={TextInput}
        />
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
        {isError && <Alert severity="error">{error.data.message}</Alert>}
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login">Sign in instead</Link>
      </p>
    </div>
  );
};
export default RegisterPage;
