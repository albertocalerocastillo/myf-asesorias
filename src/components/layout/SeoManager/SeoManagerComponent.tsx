// Al cambiar de página, actualiza el título, la descripción, el canonical y los datos estructurados.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSeo } from '../../../seo/pageSeo';
import { applySeoToDocument } from '../../../seo/seoHead';

const SeoManagerComponent = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeoToDocument(getPageSeo(pathname));
  }, [pathname]);

  return null;
};

export default SeoManagerComponent;
