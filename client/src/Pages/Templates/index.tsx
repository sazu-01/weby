
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Grid, List  } from 'lucide-react';
import { templatesData } from '../../Components/Data/templatesData';
const Templates = () => {
  
  const [isGridView, setIsGridView] = useState(true);

  return (
    <>
   <div className="bg-[#ECEFF3] max-w-[2000px] mx-auto p-4 sm:px-16">

    <div className='bg-[#FFFFFF] rounded-lg p-8'>

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-4xl font-semibold mb-6">Templates</h2>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Filter Button - Full width on mobile */}
            <button className="flex items-center justify-center px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50 w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            
            {/* Search Input - Full width on mobile */}
            <div className="relative flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* View Toggle Buttons */}
          <div className="hidden sm:flex space-x-2">
            <button 
              className={`p-2 border rounded-md ${isGridView ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
              onClick={() => setIsGridView(true)}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 border rounded-md ${!isGridView ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
              onClick={() => setIsGridView(false)}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid/List */}
      <div className={`
        ${isGridView 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6' 
          : 'flex flex-col gap-4'}
      `}>
        {templatesData.map((template) => (
          <div 
            key={template.id} 
            className={`
              group relative bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow
              ${!isGridView && 'flex flex-col sm:flex-row'}
            `}
          >
            {/* Template Preview Image */}
            <div className={`
              relative ${isGridView ? 'pb-[75%]' : 'pb-[50%] sm:pb-0 sm:w-48'}
            `}>
              <img
                src={template.image}
                alt={template.title}
                className={`
                  absolute inset-0 w-full h-full object-cover
                  ${!isGridView && 'sm:relative sm:h-32'}
                `}
              />
            </div>
            
            {/* Template Info */}
            <div className={`
              p-4 flex-grow
              ${!isGridView && 'sm:flex sm:justify-between sm:items-center'}
            `}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{template.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{template.status}</p>
                </div>
                <Link to={template.link} className="text-dark hover:text-gray-600 bg-green-400 px-2 py-1 rounded-md">
                  Edit
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  )
}

export default Templates