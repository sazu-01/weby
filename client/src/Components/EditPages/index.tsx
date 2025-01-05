import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { X, Plus, Trash2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../App/hook';
import { addNewPage, deletePage } from '../../Features/websiteSlice';

interface EditPagesProps {
  isEditPagesOpen: boolean;
  setIsEditPagesOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

 const EditPages: React.FC<EditPagesProps> = ({ isEditPagesOpen, setIsEditPagesOpen }) => {
  const dispatch = useAppDispatch();
  const [newPageName, setNewPageName] = useState('');
  const [error, setError] = useState('');
  
  const { pages, isLoading } = useAppSelector((state) => state.website);
  const { website } = useAppSelector((state) => state.website);

  const websiteId = website?._id;

 
  const handleAddPage = async () => {
    if (!newPageName.trim()) {
      setError('Page name is required');
      return;
    }

    const slug = '/' + newPageName.toLowerCase().replace(/\s+/g, '-');
    try {
      await dispatch(addNewPage({
        websiteId,
        pageName: newPageName,
        slug,
        components: ['HeaderTwo'] // Default components
      })).unwrap();
      setNewPageName('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to add page');
    }
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      await dispatch(deletePage({
        websiteId,
        pageId
      })).unwrap();
    } catch (err: any) {
      setError(err.message || 'Failed to delete page');
    }
  };

  if (!isEditPagesOpen) return null;

  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - 200,
        width: 400,
        height: "auto",
      }}
      bounds="window"
      enableResizing={false}
      dragHandleClassName="drag-handle"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 relative">
        <div className="drag-handle cursor-move">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Edit Pages</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditPagesOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Add New Page Section */}
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="add page"
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddPage}
              disabled={isLoading}
              className="flex items-center px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              <span>add page</span>
            </button>
          </div>
          {error && (
            <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Pages List */}
        <div className="mt-6 space-y-2">
          {pages?.map((page: any) => (
            <div
              key={page._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <span className="font-medium">{page.name}</span>
                <span className="text-sm text-gray-500 ml-2">{page.slug}</span>
              </div>
              {page.slug !== "/" && ( // Prevent deleting home page
                <button
                  onClick={() => handleDeletePage(page._id)}
                  disabled={isLoading}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Rnd>
  );
};

export default EditPages;