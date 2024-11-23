

import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useAppDispatch, useAppSelector } from "./App/hook";

import { getCurrentUser } from "./Features/authSlice";
function App() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedInLocal && !isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLoggedIn]);

  return <RouterProvider router={router} />;
}

export default App;