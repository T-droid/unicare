import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTitleProps {
  title: string;
}

// This component sets the document title based on the current route.
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
};

export default PageTitle;
