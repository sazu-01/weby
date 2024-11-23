
import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

//hook
import { useAppDispatch, useAppSelector } from "../../../App/hook";

//auth thunk
import { login } from "../../../Features/authSlice";

//icons
import { MdError } from "react-icons/md";


const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useAppSelector((state) => state.auth);

  //handle form submission
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ Email, Password }));
      if (login.fulfilled.match(resultAction)) {
        navigate("/")
        window.location.reload();
      }

      else if (login.rejected.match(resultAction)) {
        console.log(resultAction.payload);
      }
    } catch (error: any) {
      console.log(error);

    }

  }
  return (
    <div className="flex justify-center items-center h-screen ">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            autoComplete="none"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-medium mb-2">password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            autoComplete="none"
            placeholder="Enter your password"
            required
          />
        </div>
        {error && error !== "No access token found, please login" && (
          <div className="flex items-center mb-3 text-red-500">
            <MdError className="me-1" />
            <p>{error}</p>
          </div>
        )}
        <button type="submit" className="mt-6 w-full bg-[#0266FF] text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <Link to={`/registration`} className="block text-center text-[#2077E7] mt-2 font-medium text-md">Don't have an account?</Link>
      </form>
    </div>

  )
}

export default Login