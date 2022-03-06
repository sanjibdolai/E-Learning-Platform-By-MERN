import { Col, Container, Nav, Navbar, NavDropdown, NavItem, NavLink, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import AuthNav from "../components/AuthNav";
import SearchBar from "../components/SearchBar";

function UserLayout(props) {
    const [sideBarProps, setSideBarProps] = useState({ width: 250, spanHide: '', tooltipShow: false });
    const [arrowIcon,setArrowIcon]=useState("fa-angle-double-left");
    const sideBarPropsChange = () => {
        if (sideBarProps.width == 250){
            setArrowIcon("fa-angle-double-right");
            setSideBarProps({ width: 70, spanHide: "d-none", tooltipShow: false });
        }
        else{
            setArrowIcon("fa-angle-double-left");
            setSideBarProps({ width: 250, spanHide: "", tooltipShow: true });
        }
            
    };
    useEffect(()=>{
        const handleResize=()=>{
            if(window.innerWidth<767){
                setArrowIcon("fa-angle-double-right");
                setSideBarProps({ width: 70, spanHide: "d-none", tooltipShow: false });
            }else{
                setArrowIcon("fa-angle-double-left");
                setSideBarProps({ width: 250, spanHide: "", tooltipShow: true });
            }
        };
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
    };
    },[]);
    const menuItems = props.menuItems;

    return (
        <>
            <div id="sidenav" className="sidenav m-0 p-0">
                <SideBar menuItems={menuItems} sideBarProps={sideBarProps} />
            </div>

            <div id="mainDiv" style={{ "margin-left": sideBarProps.width + 'px' }}>
                <Navbar bg="light" variant="light" className="ps-2">
                    <a className="me-auto" onClick={sideBarPropsChange} >
                        <i className={"fas "+arrowIcon}></i>
                    </a>
                    <Nav className="me-auto">
                        <SearchBar />
                    </Nav>
                    <Nav className="pe-5">
                        <AuthNav userDetails={props.userDetails}/>
                    </Nav>
                </Navbar>
                <Container fluid className="py-2">
                    <Outlet />
                </Container>
            </div>
        </>
    );
}

export default memo(UserLayout);