
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../App/hook';
import { fetchOrCreateWebsiteData } from '../../Features/websiteSlice';
import { useParams } from 'react-router-dom';
import renderComponent from '../../Components/RenderComponents';

const TemplateTwo = () => {
  const { pages, website } = useAppSelector((state) => state.website);
  const dispatch = useAppDispatch();
  const { templateId } = useParams();

  // Refetch data when components change
  useEffect(() => {
    if (templateId && website?._id) {
      dispatch(fetchOrCreateWebsiteData(templateId));
    }
  }, [dispatch, templateId, website?._id]);

  // Find the current page based on the URL path
  const currentPath = window.location.pathname;
  const currentPage = pages.find(page => page.slug === currentPath) || pages[0];

  if (!currentPage) return null;

  return (
    <div className="template-two">
      {currentPage.components?.map((component) => renderComponent(component))}
    </div>
  );
};

export default TemplateTwo;