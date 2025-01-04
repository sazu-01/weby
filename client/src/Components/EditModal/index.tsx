

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hook";
import TemplateOne from "../../UI_Collection/TemplateOne";
import TemplateTwo from "../../UI_Collection/TemplateTwo";
import { Rnd } from "react-rnd";
import { X } from "lucide-react";
import { api } from "../../App/apiService";
import { fetchOrCreateWebsiteData, updateComponentValue } from "../../Features/websiteSlice";


interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export const Modal: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen }) => {

    
    const { websiteName, professionalTitle, menus } = 
    useAppSelector((state)=> state.website);
    console.log(websiteName);
    
    const {user} = useAppSelector((state)=> state.auth);
    const userId = user?._id;
    
    const { templateId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const isUserLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isUserLoggedIn) {
        navigate("/login");
      }
    }, [navigate]);
  
 
    useEffect(()=>{
      if(templateId)
      dispatch(fetchOrCreateWebsiteData(templateId))
    },[templateId]);


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
    
        if (!userId || !templateId) {
          throw new Error('Missing user ID or template ID');
        }
        
        // Get the current website data
        const response = await api.get(`/website/get?templateId=${templateId}`);

        if (!response.data.payload.singleWebsite) {
          throw new Error('Website not found');
        }

        const websiteData = response.data.payload.singleWebsite;
        const homePage = websiteData.pages.find((page : any) => page.name === "Home");
        
        if (!homePage) {
          throw new Error('Home page not found');
        }
        
        // Find the header component
        const headerComponent = homePage.components.find(
          (comp: any) => comp.name === "HeaderOne" || comp.name === "HeaderTwo"
        );
        
        // Find the cover component
        const coverComponent = homePage.components.find(
          (comp: any)=> comp.name === "CoverOne" || comp.name === "CoverTwo"
        );
        
        // Get the specific data IDs
        const websiteNameData = headerComponent?.data.find((item:any) => item.path === "websiteName");
        const navigationData = headerComponent?.data.find((item:any) => item.path === "Navigation");
        const titleData = coverComponent?.data.find((item:any) => item.path === "professionalTitle");
        
        // Create an array of update promises
        const updatePromises = [];
        
        // Only push updates if we have valid IDs
        if (websiteNameData?._id) {
          updatePromises.push(
            dispatch(updateComponentValue({
              dataId: websiteNameData._id,
              newValue: websiteName
            })).unwrap()
          );
        }
        
        if (titleData?._id) {
          updatePromises.push(
            dispatch(updateComponentValue({
              dataId: titleData._id,
              newValue: professionalTitle
            })).unwrap()
          );
        }
        
        if (navigationData?._id) {
          updatePromises.push(
            dispatch(updateComponentValue({
              dataId: navigationData._id,
              newValue: menus
            })).unwrap()
          );
        }
        
        // Wait for all updates to complete
        await Promise.all(updatePromises);
        
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to update components:', error);
        // You might want to show an error message to the user here
      }
    };
  


    const handleWebsiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'website/updateWebsiteName',
        payload: e.target.value
      });
    };
  
    const handleProfessionalTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'website/updateProfessionalTitle',
        payload: e.target.value
      });
    };
  
    const handleMenuChange = (index: number, value: string) => {
      dispatch({
        type: 'website/updateMenu',
        payload: { index, value }
      });
    };
    
     
    return (
      <>
     {templateId === "p1" && <TemplateOne  />}
  
     {templateId === "p2" && <TemplateTwo />}
  
        {isModalOpen && (
          <Rnd
            default={{
              x: window.innerWidth / 2 - 200, // Center horizontally
              y: window.innerHeight / 2 - 200, // Center vertically
              width: 400,
              height: "auto",
            }}
            bounds="window" // Restrict movement to the viewport
            enableResizing={false} // Disable resizing if not needed
            dragHandleClassName="drag-handle" // Use a specific class as drag handle
          >
            <div className="bg-white rounded-lg shadow-xl p-6 relative box-border">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-2 mb-4 drag-handle cursor-move">
                <h2 className="text-xl font-bold">Edit Site</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X />
                </button>
              </div>
  
              {/*update data Modal Body */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="websiteName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Update Website Name
                  </label>
                  <input
                    id="websiteName"
                    type="text"
                    value={websiteName}
                    onChange={handleWebsiteNameChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder={websiteName || "Enter new website name"}
                  />
                </div>
  
                <div>
                  <label
                    htmlFor="professionalTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Update Professional Title
                  </label>
                  <input
                    id="professionalTitle"
                    type="text"
                    value={professionalTitle}
                    onChange={handleProfessionalTitleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Enter professional title"
                  />
                </div>
  
                <div>
                  <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-2">
                   Edit Menus
                  </label>
                  {menus?.map((menu, index)=> (
                    <div key={index} className="mb-2">
                         <input type="text" 
                          value={menu}
                          onChange={(e) => handleMenuChange(index, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                          placeholder={`Menu ${index + 1}`}
                         />
                    </div>
                  ))}
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-500 transition"
                >
                  Update Data
                </button>
              </form>
            </div>
          </Rnd>
        )}
      </>
    );
  };