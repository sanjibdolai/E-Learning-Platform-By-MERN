import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <Navigation/>

      <Outlet />
      
      <Footer/>
    </>
  )
};

export default Layout;