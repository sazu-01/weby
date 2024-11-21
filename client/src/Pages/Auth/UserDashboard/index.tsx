
import { IoMdHome } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

const Dashboard = () => {
  // Sample user data for demonstration
  const sampleUser = {
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "+1 234 567 8900"
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="container flex mx-0 2xl:mx-auto">
        {/* Sidebar */}
        <div className="w-20 bg-gray-900 text-white md:w-64">
          <div className="p-4">
            <h1 className="text-2xl font-bold hidden px-4 md:block">Dashboard</h1>
          </div>
          
          <nav className="mt-6">
            <a
              className="flex items-center py-2 px-8 bg-gray-700 cursor-pointer"
            >
              <IoMdHome className="w-5 h-5" />
              <span className="ms-2 hidden md:block">Home</span>
            </a>
            
            <a
              className="flex items-center py-2 px-8 hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <FaUserCheck className="w-5 h-5" />
              <span className="ms-2 hidden md:block">User Info</span>
            </a>
            
            <a
              className="flex items-center py-2 px-8 hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <IoIosSettings className="w-5 h-5" />
              <span className="ms-2 hidden md:block">Settings</span>
            </a>
            
            <a
              className="flex items-center py-2 px-8 hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <MdOutlineLogout className="w-5 h-5" />
              <span className="ms-2 hidden md:block">Logout</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Home Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
            <p className="text-gray-600">Select an option from the sidebar to view more information.</p>
          </div>

          {/* User Info Content (Hidden by default, shown for demonstration) */}
          <div className="p-6 hidden">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="mb-3">
                <span className="font-semibold">Name:</span> {sampleUser.fullName}
              </p>
              <p className="mb-3">
                <span className="font-semibold">Email:</span> {sampleUser.email}
              </p>
              <p className="mb-3">
                <span className="font-semibold">Phone:</span> {sampleUser.phoneNumber}
              </p>
            </div>
          </div>

          {/* Settings Content (Hidden by default, shown for demonstration) */}
          <div className="p-6 hidden">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">This is where you would put your settings options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;