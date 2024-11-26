
import { FormEvent, useState, useEffect } from "react";
import { api } from "../../App/apiService";
import { X, Home, User, Settings, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TemplateOne = () => {

  //state
  const [websiteName, setWebsiteName] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  // Fetch website name when component mounts
  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await api.get("/website/get", { params: { templateId: "p1" } });
        if (response.data.payload.data && response.data.payload.data.length > 0) {
          const latestData = response.data.payload.data[0];
          setWebsiteName(latestData.websiteName);
          setProfessionalTitle(latestData.professionalTitle);
          setDocumentId(latestData._id); // Save the document ID for updates
        }
      } catch (error) {
        console.error("Error fetching website name:", error);
      }
    };

    fetchWebsiteData();
  }, []);

  //check if user login or not
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/login');
    }
  }, [isUserLoggedIn, navigate])

  //update the content by user
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!documentId) {
      alert("No existing website name found to update!");
      return;
    }
    try {
      const res = await api.put(`/website/update/${documentId}`,
        {
          websiteName,
          professionalTitle,
          templateId: "p1"
        });
      if (res.status === 200) {
        setWebsiteName(websiteName);
        setProfessionalTitle(professionalTitle)
      }
    } catch (error) {
      console.error("Error updating website name:", error);
      alert("Failed to update website data. Please try again.");
    }
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
              <a href="#" className="text-base font-medium text-white hover:text-blue-200 transition duration-300">
                Home
              </a>
              <a href="#" className="text-base font-medium text-white hover:text-blue-200 transition duration-300">
                About
              </a>
              <a href="#" className="text-base font-medium text-white hover:text-blue-200 transition duration-300">
                Services
              </a>
              <a href="#" className="text-base font-medium text-white hover:text-blue-200 transition duration-300">
                Contact
              </a>
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
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium text-gray-900">Menu</div>
                  <button
                    onClick={toggleMenu}
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <a href="#" className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg">
                      <Home className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                      <span className="ml-3 text-base font-medium text-gray-900">Home</span>
                    </a>
                    <a href="#" className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg">
                      <User className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                      <span className="ml-3 text-base font-medium text-gray-900">About</span>
                    </a>
                    <a href="#" className="flex items-center p-3 -m-3 hover:bg-gray-50 rounded-lg">
                      <Settings className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                      <span className="ml-3 text-base font-medium text-gray-900">Services</span>
                    </a>
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
      <form
        onSubmit={handleUpdate}
        className="text-center mt-12"
      >
        <div>
          <label htmlFor="websiteName" className="mr-2">Update Website Name: </label>
          <input
            id="websiteName"
            type="text"
            onChange={(e) => setWebsiteName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder={websiteName || "Enter new website name"}
          />
        </div>

        <div>
          <label htmlFor="profesttionTitle" className="mr-2">Update professionalTitle: </label>
          <input
            id="profesttion title"
            type="text"
            onChange={(e) => setProfessionalTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-indigo-500"
            placeholder={"enter professional title"}
          />
        </div>


        <button
          type="submit"
          className="bg-yellow-400 py-2 px-4 rounded-md mt-4 hover:bg-yellow-500 transition"
          disabled={!documentId}
        >
          Update Data
        </button>
      </form>
    </>
  );
};

export default TemplateOne;