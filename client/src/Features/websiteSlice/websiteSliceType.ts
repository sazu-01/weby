

interface ComponentData {
    path: string;
    value: string | string[];
    _id : string;
  }
  
  interface Component {
    _id : string;
    name: string;
    data: ComponentData[];
  }
  
  interface Page {
    _id: string;
    name: string;
    components: Component[];
  }
  
 export interface Website {
    _id: string;
    pages: Page[];
    userId : string;
    templateId: string;
  }

 export interface initialStateType {
     isLoading : boolean,
     error : null | string,
     homePage : string[]
     websiteName : string,
     professionalTitle : string;
     menus : string[]
 } 