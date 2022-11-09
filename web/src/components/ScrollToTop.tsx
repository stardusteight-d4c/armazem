import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {}

export const ScrollToTop = (props: Props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}