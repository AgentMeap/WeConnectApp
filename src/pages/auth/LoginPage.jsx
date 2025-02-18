import FormField from '@components/FormField';
import TextInput from '@components/FormInputs/TextInput';
import { Button, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '@services/rootApi';
import { openSnackbar } from '@redux/slices/snackbarSlice';

const LoginPage = () => {
  const [login, { data = {}, isLoading, error, isSuccess, isError }] =
    useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email is not valid',
      )
      .required(),
    password: yup.string().required(),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function onSubmit(formData) {
    console.log({ formData });
    login(formData);
  }

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: 'error', message: error?.data?.message }));
    }
    if (isSuccess) {
      dispatch(openSnackbar({ message: data?.message }));
      navigate('/verify-otp');
    }
  }, [isError, error, dispatch, isSuccess, data, navigate]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors['email']}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors['password']}
        />
        <Button type="submit" variant="contained">
          {isLoading && (
            <CircularProgress size={16} className="mr-2"></CircularProgress>
          )}
          Sign In
        </Button>
      </form>
      <p className="mt-4 text-center">
        New on our platform? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};
export default LoginPage;
