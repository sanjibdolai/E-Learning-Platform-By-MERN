import { Container, Nav, Navbar} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import AuthNav from "../components/AuthNav";
import SearchBar from "../components/SearchBar";

function UserLayout(props) {
    console.log("UserLayout");
    console.log(props);
    const [sideBarProps, setSideBarProps] = useState({ width: 220, spanHide: '', tooltipShow: false });
    const [arrowIcon,setArrowIcon]=useState("fa-angle-double-left");
    const sideBarPropsChange = () => {
        if (sideBarProps.width === 220){
            setArrowIcon("fa-angle-double-right");
            setSideBarProps({ width: 55, spanHide: "d-none"});
        }
        else{
            setArrowIcon("fa-angle-double-left");
            setSideBarProps({ width: 220, spanHide: ""});
        }
            
    };
    useEffect(()=>{
        const handleResize=()=>{
            if(window.innerWidth<767){
                setArrowIcon("fa-angle-double-right");
                setSideBarProps({ width: 55, spanHide: "d-none"});
            }else{
                setArrowIcon("fa-angle-double-left");
                setSideBarProps({ width: 220, spanHide: ""});
            }
        };
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
    };
    },[]);

    return (
        <>
            <div id="sidenav" className="sidenav m-0 p-0">
                <SideBar menuItems={props.menuItems} sideBarProps={sideBarProps} />
            </div>

            <div id="mainDiv" style={{ "marginLeft": sideBarProps.width + 'px' }}>
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