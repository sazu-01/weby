import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../App/hook';
import { Rnd } from 'react-rnd';
import { XCircle, Trash2 } from 'lucide-react';
import { addComponentToPage, removeComponentFromPage } from '../../Features/websiteSlice';

interface GetComponentsProps {
    isGetCompoenentOpen: boolean;
    setIsGetComponentOpen: (value: boolean) => void;
}

export const GetComponents: React.FC<GetComponentsProps> = ({ isGetCompoenentOpen, setIsGetComponentOpen }) => {
  const dispatch = useAppDispatch();
  const [selectedPage, setSelectedPage] = useState('');
  const [availableComponents] = useState(['HeaderOne', 'HeaderTwo', 'CoverOne', 'CoverTwo']);
  
  
  const website = useAppSelector((state) => state.website.website);
  const websiteId = website?._id;
  const pages = website?.pages || [];
  
  const handleAddComponent = async (componentName: string) => {
    if (!selectedPage) {
      alert('Please select a page first');
      return;
    }
    
    const existingComponents = pages.find(p => p._id === selectedPage)?.components || [];
    if (existingComponents.some(comp => comp.name === componentName)) {
      alert('This component already exists on the selected page');
      return;
    }
    
    await dispatch(addComponentToPage({
      websiteId,
      pageId: selectedPage,
      componentName
    }));
  };

  const handleRemoveComponent = async (componentId: string) => {
    if (!selectedPage || !websiteId) return;
    
    if (window.confirm('Are you sure you want to remove this component?')) {
        console.log('remove component req is coming');
        
      await dispatch(removeComponentFromPage({
        websiteId,
        pageId: selectedPage,
        componentId
      }));
    }
  };

  const currentPageComponents = pages.find(p => p._id === selectedPage)?.components || [];

  return (
    <>
      {isGetCompoenentOpen && (
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
              <h3 className="text-lg font-semibold mb-4">Manage Components</h3>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsGetComponentOpen(false)}
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Page</label>
              <select 
                className="w-full p-2 border rounded"
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
              >
                <option value="">Choose a page</option>
                {pages.map((page) => (
                  <option key={page._id} value={page._id}>
                    {page.name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedPage && (
              <>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Current Components</h4>
                  {currentPageComponents.map((component) => (
                    <div key={component._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <span>{component.name}</span>
                      <span>{component._id}</span>
                      <button 
                        onClick={() => handleRemoveComponent(component._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium mb-2">Available Components</h4>
                  {availableComponents
                    .filter(comp => !currentPageComponents.some(c => c.name === comp))
                    .map((component) => (
                      <button
                        key={component}
                        onClick={() => handleAddComponent(component)}
                        className="w-full p-2 text-left hover:bg-gray-100 rounded transition-colors"
                      >
                        {component}
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>
        </Rnd>
      )}
    </>
  );
};

export default GetComponents;