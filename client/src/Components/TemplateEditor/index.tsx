import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Monitor, Smartphone } from "lucide-react";
import { Modal } from "../EditModal";
import EditPages from "../EditPages";
import { GetComponents } from "../Getcomponetns";
import { fetchOrCreateWebsiteData } from "../../Features/websiteSlice";
import { useAppDispatch } from "../../App/hook";
import { useParams } from "react-router-dom";
import TemplateOne from "../../UI_Collection/TemplateOne";
import TemplateTwo from "../../UI_Collection/TemplateTwo";

export const TemplateEditor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPagesOpen, setIsEditPagesOpen] = useState(false);
  const [isGetCompoenentOpen, setIsGetComponentOpen] = useState(false);

  const { templateId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (templateId) dispatch(fetchOrCreateWebsiteData(templateId));
  }, [templateId, dispatch]);

  return (
    <>
      <div className="flex flex-col">
        {/* Header Navigation */}
        <div className="flex items-center justify-between bg-white shadow-md py-3 px-2 border-b">
          <div>
            <Link
              to={`/`}
              target="_blank"
              className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              wayvi
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Monitor className="text-gray-600 w-6 h-6" />
            <Smartphone className="text-gray-600 w-6 h-6" />
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-[#9F42BD] font-semibold cursor-pointer"
              onClick={() => setIsEditPagesOpen(true)}
            >
              Edit Pages
            </button>
            <button
              className="text-[#9F42BD] font-semibold cursor-pointer"
              onClick={() => setIsGetComponentOpen(true)}
            >
              Edit Components
            </button>
            <button
              className="text-[#9F42BD] font-semibold cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Site
            </button>
            <Link
              to={`/`}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-[0.9rem] rounded-md hover:bg-gray-200 transition-colors"
            >
              Preview
            </Link>
            <Link
              to={`/`}
              className="px-3 py-1 bg-blue-500 text-white text-[0.9rem] rounded-md hover:bg-blue-600 transition-colors"
            >
              Publish
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow z-10">
          {/*for editing pages */}
          <EditPages
            isEditPagesOpen={isEditPagesOpen}
            setIsEditPagesOpen={setIsEditPagesOpen}
          />
          {/*for editing componetn */}
          <GetComponents
            isGetCompoenentOpen={isGetCompoenentOpen}
            setIsGetComponentOpen={setIsGetComponentOpen}
          />
          {/*for editing content */}
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>

      {templateId === "p1" && <TemplateOne />}

      {templateId === "p2" && <TemplateTwo />}
    </>
  );
};
