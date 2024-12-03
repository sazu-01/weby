
import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../../App/apiService";
//hook
import { useAppDispatch, useAppSelector } from "../../../App/hook";

//auth thunk
import { login } from "../../../Features/authSlice";



const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [requiresGoogleLogin, setRequiresGoogleLogin] = useState(false);
  const [passwordField, setPasswordField] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.auth);


  const handleEmailCheck = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/check-email", { Email });
      
      if (res.data.success && res.data.payload === "google") {
        setRequiresGoogleLogin(true);
      } else {
        setPasswordField(true)
      }

    } catch (error: any) {
      if(error.status=== 404) alert(error.response.data.message)
      console.log(error.response?.data?.message || "Something went wrong.");
    }
  };

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


  if (requiresGoogleLogin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login with Google
          </h2>
          <Link
            to={`https://weby-server.vercel.app/api/auth/google`}
            className="block text-center bg-[#0266FF] text-white rounded-lg p-3"
          >
            Sign in with Google
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={passwordField ? handleLogin : handleEmailCheck} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <p className="text-2xl font-semibold text-center mb-6">Don't have an account? <Link to={`/registration`}>Register</Link></p>
        <div className="mb-3">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {passwordField && (
          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-3 mb-3 w-full bg-[#0266FF] text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isLoading ? "Processing..." : Password ? "Login" : "Next"}
        </button>

        <div className="my-4">
          <div className="flex items-center justify-center">
            <div className="h-px bg-gray-600 w-full"></div>
            <span className="px-4 bg-white text-gray-500 text-sm">or</span>
            <div className="h-px bg-gray-600 w-full"></div>
          </div>
        </div>

        <div className="mb-3 ">

          <button className="w-full flex flex-row items-center bg-[#0266FF] text-white border bg-[#1A73E8] rounded-lg p-1 ">
            <div className="">
              <img src="https://developers.google.com/static/identity/images/g-logo.png" alt=""
                className="w-8 rounded-lg"
              />
            </div>
            <div className="w-full">
              <Link
                to={`https://weby-server.vercel.app/api/auth/google`}
                className=""
              >
                Continue with Google
              </Link>
            </div>

          </button>

        </div>


      </form>
    </div>

  )
}

export default Login