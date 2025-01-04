
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useAppSelector } from "../../App/hook";
import { Link } from "react-router-dom";
export const HeaderOne = () => {
    
    const {websiteName, menus} = useAppSelector((state)=> state.website);

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
              <Link to={`/${menu}`} key={index} className="text-base font-medium text-white hover:text-blue-200 transition duration-300">
                {menu}
              </Link>
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
                    {menus?.map((menu, index)=>(
                    <Link to={`/${menu.toLowerCase()}`} key={index} className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg">
                    <span className="ml-3 text-base font-medium text-gray-900">{menu}</span>
                  </Link>
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
        
        </>
    )
}



export const HeaderTwo = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {websiteName, menus} = useAppSelector((state)=> state.website);

    return (
        <>
              <header className="bg-white-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-800">
              <a href="#">{websiteName || "Logo"}</a>
            </div>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              {menus?.map((menu, index) => (
                <Link to={`/${menu}`} key={index} className="block text-gray-600 hover:text-gray-900">
                  {menu}
                </Link>
              ))}
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
                {menus?.map((menu, index)=> (
                   <Link to={`/${menu}`} key={index} className="block text-gray-600 hover:text-gray-900">
                    {menu}
                   </Link>
                ))}
               
               
              </nav>
            </div>
          )}
        </div>
      </header>
        </>
    )
}












