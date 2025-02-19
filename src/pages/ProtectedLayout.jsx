import Header from '@components/Header';
import { saveUserInfo } from '@redux/slices/authSlice';
import { useGetAuthUserQuery } from '@services/rootApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const response = useGetAuthUserQuery();
  console.log({ response });
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [response.data, dispatch, response.isSuccess]);

  if (response.error?.code === 401) {
    return <Navigate to="/login"></Navigate>;
  }

  if (response.isLoading) {
    return <p>Loading...</p>;
  }

  /*
  isLoading: nó chỉ set thành true ở lần query đầu tiên
  isFetching: nó chỉ set thành true ở lần query đầu tiên và khi API được fetching
  */

  if (!response?.data?._id) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
export default ProtectedLayout;
