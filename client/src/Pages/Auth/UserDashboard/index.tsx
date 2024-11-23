
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../App/hook';
import { logout, resetAuth } from '../../../Features/authSlice';
import { useNavigate } from 'react-router-dom';

//icons
import { IoMdHome } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";


const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('home');
  
  //checked 
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(()=>{
    if(!isUserLoggedIn){
      navigate('/login');
    }
  },[isUserLoggedIn, navigate])


  console.log(isUserLoggedIn);
  

  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      // Reset auth state
      dispatch(resetAuth());
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force reset auth state even if API call fails
      dispatch(resetAuth());
      navigate('/login');
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
            <p>Select an option from the sidebar to view more information.</p>
          </div>
        );
      case 'userInfo':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            {user ? (
              <>
                <p className="mb-2">Name: {user.FullName}</p>
                <p className="mb-2">Email: {user.Email}</p>
                <p className="mb-4">Phone: {user.PhoneNumber}</p>
              </>
            ) : (
              <p>No user is logged in.</p>
            )}
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>This is where you would put your settings options.</p>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="container flex mx-0 2xl:mx-auto">
      {/* Sidebar */}
      <div className=" w-20 bg-gray-900 text-white md:w-64  ">
        <div className="p-4">
          <h1 className="text-2xl font-bold hidden px-4 md:block">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a
            className={`flex items-center py-2 px-8 ${activeTab === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('home')}
          >
            <span><IoMdHome /></span>
            <p className='ms-2 hidden md:block'>Home</p>
          </a>
          <a
            className={`flex items-center py-2 px-8 ${activeTab === 'userInfo' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('userInfo')}
          >
            <span><FaUserCheck /></span>
            <p className='ms-2 hidden md:block'>User Info</p>


          </a>
          <a
            className={`flex items-center py-2 px-8 ${activeTab === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('settings')}
          >
            <span><IoIosSettings /></span>
            <p className='ms-2 hidden md:block'>Settings</p>
          </a>

          <a
            className={`flex items-center py-2 px-8 hover:bg-gray-700`}
            onClick={handleLogout}
          >
            <span><MdOutlineLogout /></span>
            <p className='ms-2 hidden md:block'>Logout</p>
          </a>


        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
      </div>

    </div>
  );
}

export default Dashboard;