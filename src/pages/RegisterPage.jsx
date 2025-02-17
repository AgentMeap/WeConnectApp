import FormField from '@components/FormField';
import TextInput from '@components/FormInputs/TextInput';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const { control } = useForm();
  return (
    <div className="bg-dark-200 flex h-screen items-center justify-center">
      <div className="h-fit w-[450px] bg-white px-8 py-10">
        <img src="/weconnect-logo.png" className="mx-auto mb-6" />
        <p className="mb-5 text-center text-2xl font-bold">Register</p>
        <form className="flex flex-col gap-4">
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
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login">Sign in instead</Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
