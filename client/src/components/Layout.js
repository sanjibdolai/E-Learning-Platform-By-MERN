import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Container fluid className="shadow bg-light p-2 bodyContainer">
        <Outlet />
      </Container>
      <Footer />
    </>
  )
};

export default Layout;