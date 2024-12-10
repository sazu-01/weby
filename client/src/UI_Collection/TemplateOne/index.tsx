
import { useState } from "react";
import { X, Menu } from "lucide-react";


const TemplateOne = ({ websiteName, professionalTitle, menus }: { 
  websiteName: string, 
  professionalTitle: string
  menus : string[] 
}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  //toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <>
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:space-x-10">
            {/* Logo */}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/" className="flex items-center">
                <span className="text-3xl font-bold text-white tracking-wide">
                  {websiteName || "NoName"}
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 -my-2 md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-white/20 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              {menus?.map((menu, index)=>(
              <a href="#" key={index} className="text-base font-medium text-white hover:text-blue-200 transition duration-300">
                {menu}
              </a>
              ))}
            </nav>

            {/* Call to Action */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute z-10 top-full inset-x-0 transform shadow-lg md:hidden">
            <div className=" shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
 
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {menus.map((menu)=>(
                    <a href="#" className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg">
                    <span className="ml-3 text-base font-medium text-gray-900">{menu}</span>
                  </a>
                    ))}

                  </nav>
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>


      <main className="p-5 h-auto bg-green-600">
        <div>
          <h2>cover section</h2>
          <p>{professionalTitle || "default title"}</p>
        </div>
      </main>

    
    </>
  );
};

export default TemplateOne;