

import { CoverOne } from "../Covers";
import { HeaderOne } from "../Headers";

const TemplateOne = ({ websiteName, professionalTitle, menus }: { 
  websiteName: string, 
  professionalTitle: string
  menus : string[] 
}) => {



  return (
    <>
    
    <HeaderOne websiteName={websiteName} menus={menus} />

   <CoverOne professionalTitle={professionalTitle} />

    
    </>
  );
};

export default TemplateOne;