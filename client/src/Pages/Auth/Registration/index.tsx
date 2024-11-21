import { Link } from "react-router-dom";


const Register = () => {
  return (
    <div className="flex justify-center items-center h-auto my-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color transition-colors"
            autoComplete="none"
          />
        </div>

  

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color transition-colors"
            autoComplete="none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color transition-colors"
            autoComplete="none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color transition-colors"
            autoComplete="none"
          />
        </div>

        {/* Error Message Design */}
        <div className="flex items-center mb-4 text-red-500">
          <p>Error message goes here</p>
        </div>

        <button 
          className="w-full bg-[#0266FF] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-6"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <Link 
             to={`/login`}
            className="text-[#2077E7] hover:text-blue-600 font-medium transition-colors"
          >
            Already have an account?
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Register;