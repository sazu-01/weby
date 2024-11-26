


import Header from "./Layouts/Header";

import { Outlet, useLocation } from "react-router-dom";
import { templatesData } from "./Components/Data/templatesData";

const Root = () => {

  const location = useLocation();
  // Check if the current route matches any template route
  const isTemplatePage = templatesData.some((template) =>
    location.pathname.includes(`/templates/${template.link}`)
  );
  

  return (
    <>
      {!isTemplatePage && <Header />} 
      <Outlet />

    </>
  )
}

export default Root