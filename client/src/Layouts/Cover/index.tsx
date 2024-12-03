
import { Link } from "react-router-dom"
import { Code, Globe, ArrowRight, Zap } from "lucide-react"
const Cover = () => {
  return (
    <>
       <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Text Content */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Build Your Dream Website <br /> 
            <span className="text-blue-600">In Minutes, Not Months</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Unleash your creativity with our intuitive website builder. Design, customize, and launch your perfect website without coding skills.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center px-8 py-3 
              bg-blue-600 text-white font-semibold rounded-full 
              hover:bg-blue-700 transition-all duration-300 
              shadow-lg hover:shadow-xl group"
            >
              Create a Website
              <ArrowRight 
                className="ml-2 group-hover:translate-x-1 transition-transform" 
                size={20} 
              />
            </Link>
            
            <Link 
              to="/features" 
              className="inline-flex items-center justify-center px-8 py-3 
              border-2 border-blue-600 text-blue-600 font-semibold rounded-full 
              hover:bg-blue-50 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
          
          {/* Feature Highlights */}
          <div className="flex justify-center space-x-4 text-gray-600 pt-4">
            <div className="flex items-center space-x-2">
              <Code className="text-blue-600" size={20} />
              <span>No Coding</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="text-blue-600" size={20} />
              <span>Custom Domains</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="text-blue-600" size={20} />
              <span>Fast Hosting</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
    </>
  )
}

export default Cover