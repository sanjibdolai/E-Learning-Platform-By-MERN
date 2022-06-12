import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import AuthNav from "../components/AuthNav";
import SearchBar from "../components/SearchBar";

function UserLayout(props) {
    const [topNavTitle,setTopNavTitle]=useState(<SearchBar/>);
    const [sideBarProps, setSideBarProps] = useState({ width: 220, spanHide: '', tooltipShow: false, smallScreen: false });
    const [arrowIcon, setArrowIcon] = useState("fa-angle-double-left");
    const sideBarPropsChange = () => {
        if (!sideBarProps.smallScreen) {
            if (sideBarProps.width === 220) {
                setArrowIcon("fa-angle-double-right");
                setSideBarProps({ width: 55, spanHide: "d-none",smallScreen: false });
            } else {
                setArrowIcon("fa-angle-double-left");
                setSideBarProps({ width: 220, spanHide: "",smallScreen: false });
            }
        }else{
            if (sideBarProps.width === 0) {
                setArrowIcon("fa-angle-double-left");
                setSideBarProps({ width: 55, spanHide: "d-none",smallScreen: true});
            }else{
                setArrowIcon("fa-angle-double-right");
                setSideBarProps({ width: 0, spanHide: "d-none",smallScreen: true });
            }
        }

    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 767) {
                setArrowIcon("fa-angle-double-right");
                setSideBarProps({ width: 0, spanHide: "d-none", smallScreen: true });
            }
            else{
                setArrowIcon("fa-angle-double-left");
                setSideBarProps({ width: 220, spanHide: "",smallScreen: false});
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onChildComponentChange=(com)=>{
        setTopNavTitle(com);
    }

    return (
        <>
            <div id="sidenav" className="sidenav m-0 p-0">
                <SideBar menuItems={props.menuItems} sideBarProps={sideBarProps} />
            </div>

            <div id="mainDiv" style={{ "marginLeft": sideBarProps.width + 'px' }}>
                <Navbar bg="light" variant="light" className="ps-2">
                    <a className="me-auto" onClick={sideBarPropsChange} >
                        <i className={"fas " + arrowIcon}></i>
                    </a>
                    <Nav className="me-auto" >
                       {topNavTitle}
                    </Nav>
                    {props.pageType && props.pageType==='Learner' &&
                    <Nav className="me-3">
                    <Nav.Link
                                as={Link}
                                to="/cart"
                                className='position-relative text-info'
                            >
                                <i className="fas fa-shopping-cart fs-3"></i>
                                <span id="cartCount" className="position-absolute top-5 start-10 translate-middle badge rounded-pill bg-warning">
                                    
                                </span>
                            </Nav.Link>
                    </Nav>
                    }
                    <Nav className="me-4">
                    <Nav.Link
                                        as={Link}
                                        to="/notifications"
                                        className='position-relative text-info'
                                    >
                                        <i className="fa-solid fa-bell fs-3"></i>
                                        <span className="position-absolute top-5 start-10 translate-middle badge rounded-pill bg-warning">
                                            99
                                        </span>
                                    </Nav.Link>
                    </Nav>
                    <Nav className="pe-5">
                        <AuthNav userDetails={props.userDetails} />
                    </Nav>
                </Navbar>
                <Container fluid className="py-2">
                    <Outlet context={[topNavTitle,setTopNavTitle]}/>
                </Container>
            </div>
        </>
    );
}

export default memo(UserLayout);