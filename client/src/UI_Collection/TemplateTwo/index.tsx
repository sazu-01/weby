import { FormEvent, useState, useEffect } from "react";
import { api } from "../../App/apiService";

import { useNavigate } from "react-router-dom";

const TemplateTwo = () => {
  const [websiteName, setWebsiteName] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [documentId, setDocumentId] = useState(""); 
  const [isOpen, setIsOpen] = useState(false);


  // Fetch website name when component mounts
  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await api.get("/website/get",{params : {templateId : "p2"}});
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

       const navigate = useNavigate();
      //checked 
      const isUserLoggedIn = localStorage.getItem("isLoggedIn");

      useEffect(()=>{
        if(!isUserLoggedIn){
          navigate('/login');
        }
      },[isUserLoggedIn, navigate])

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!documentId) {
      alert("No existing website name found to update!");
      return;
    }

    try {
      const res = await api.put(`/website/update/${documentId}`, 
      { websiteName, professionalTitle, templateId : "p2" });
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

export default TemplateTwo;