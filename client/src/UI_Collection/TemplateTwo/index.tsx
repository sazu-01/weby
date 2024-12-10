

import { CoverTwo } from "../Covers";
import { HeaderTwo } from "../Headers";


const TemplateTwo = ({ websiteName, professionalTitle, menus }: {
  websiteName: string,
  professionalTitle: string,
  menus: string[],
}) => {



  return (
    <>

      <HeaderTwo websiteName={websiteName} menus={menus} />
      
      <CoverTwo professionalTitle={professionalTitle} />

    </>
  );
};

export default TemplateTwo;