
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Monitor, Smartphone} from "lucide-react";
import { Modal } from "../EditModal";


export const TemplateEditor: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header Navigation */}
      <div className="flex items-center justify-between bg-white shadow-md py-3 px-2 border-b">
        <div>
          <Link
            to={`/`}
            target="_blank"
            className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Wayvi
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Monitor className="text-gray-600 w-6 h-6" />
          <Smartphone className="text-gray-600 w-6 h-6" />
        </div>
        <div className="flex items-center space-x-4">
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
      <div className="flex-grow">
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

