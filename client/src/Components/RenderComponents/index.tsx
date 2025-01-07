
import { HeaderOne, HeaderTwo } from "../../UI_Collection/Headers";
import { CoverOne, CoverTwo } from "../../UI_Collection/Covers";



// This function will take a component as an argument and return the corresponding component
export default function renderComponent (component: any)  {
    switch (component.name) {
      case 'HeaderOne':
        return <HeaderOne  />;
      case 'CoverOne':
        return <CoverOne />;
      case "HeaderTwo": 
      return <HeaderTwo />; 
      case "CoverTwo":
        return <CoverTwo />;
      default:
        return null;
    }
  };