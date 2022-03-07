import { memo } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Container fluid className="py-2 bodyContainer">
        <Outlet />
      </Container>
      <Footer />
    </>
  )
};

export default memo(Layout);