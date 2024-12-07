
import TemplateOne from "../../UI_Collection/TemplateOne";
import TemplateTwo from "../../UI_Collection/TemplateTwo";
import DemoTemplate from "../../UI_Collection/DemoTemplate";


export default function GetTemplateComponent(templateName: any) {
    switch (templateName) {
        case "my-site":
            return <TemplateOne websiteName={``} professionalTitle={``} />

        case "techo":
            return <TemplateTwo websiteName={``} professionalTitle={``} />

        case "my-site-5":
            return <DemoTemplate />

        case "chocolate":
            return <DemoTemplate />
        case "template-5":
            return <DemoTemplate />    
        default:
            return null;
    }
}

