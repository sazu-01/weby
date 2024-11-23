import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");
  const menuItems = [
    { name: 'Templates', type: 'link', href: "/templates", },
    { name: 'Page Builder', type: 'dropdown', },
    { name: 'Blogs', type: 'link', },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-blue-600 font-bold text-2xl">
              <Link to={`/`} className="flex items-center gap-2 font-bold">
                Wayvi
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item: any) => (
              <div key={item.name} className="relative">
                <Link to={item.href}
                  className="text-gray-700 hover:text-gray-900 px-1 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.name}
                  {item.type === 'dropdown' && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isUserLoggedIn && (<Link to={`/login`} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>)}  

            <Link to={isUserLoggedIn ? `/user-dashboard` : `/registration`} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
               {isUserLoggedIn ? `Dashboard` : `Get Started`}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md 
                text-base font-medium w-full text-left"
              >
                {item.name}
              </button>
            ))}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <Link to={`/login`} onClick={() => setIsOpen(!isOpen)}
                className="block w-full text-left px-3 py-2 text-base font-medium 
              text-gray-700 hover:text-gray-900">Login</Link>
              <Link to={isUserLoggedIn ? `Dashboard` : `/registration`} onClick={() => setIsOpen(!isOpen)}
                className="mt-1 block w-full text-left px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                {isUserLoggedIn ? `Dashboard` : `Get Started`} 
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;