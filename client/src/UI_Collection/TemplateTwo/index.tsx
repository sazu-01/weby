
import { useState } from "react";


const TemplateTwo = ({ websiteName, professionalTitle }: { 
  websiteName: string, 
  professionalTitle: string 
}) => {

  const [isOpen, setIsOpen] = useState(false);


  
  return (
    <>
<header className="bg-white-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">
            <a href="#">{websiteName || "Logo"}</a>
          </div>

          {/* Navigation (desktop) */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>

          {/* Hamburger Menu (mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <nav className="space-y-4">
              <a href="#" className="block text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-900">
                Services
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
   

      <main className="p-5 h-auto bg-sky-600">
        <div className="text-center">
          <h2>cover section</h2>
          <p>{professionalTitle || "default title"}</p>
        </div>
      </main>

    </>
  );
};

export default TemplateTwo;