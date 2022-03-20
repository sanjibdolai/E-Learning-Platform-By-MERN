import { memo } from "react";
import { Dropdown, Nav, NavDropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from './Logo';
function SideBar(props) {
  const spanHide = props.sideBarProps.spanHide;
  const menuItems = props.menuItems;
  return (
    <>
      <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation" style={{ width: props.sideBarProps.width + 'px' }}>
        <Nav as="ul" defaultActiveKey={window.location.pathname} className="sidebar-nav" >
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <Link to="/" className="text-decoration-none">
                <Logo width="35rem" height="35rem" />
                <span className={'fs-4 ms-3 ' + spanHide}>E-Learning</span>
              </Link>
            </div>
          </div>
          {menuItems.map((item, index) =>
            <Nav.Item as="li" key={index}>
              <OverlayTrigger
                placement="right"
                key={index}
                overlay={
                  <Tooltip id={"tooltip-" + index}>
                    <strong>{item.itemName}</strong>
                  </Tooltip>
                }
              >
                <Nav.Link as={Link} eventKey={item.itemURL} to={item.itemURL ? item.itemURL : ""} {...item.subMenu ? { "data-bs-toggle": "collapse", "data-bs-target": "#subMenu" + index } : ''}>
                  <i className={'fs-5 ' + item.itemIcon}></i>
                  <span className={'ms-3 ' + spanHide}>{item.itemName}</span>
                  {/* {item.subMenu &&
                  <i className="fa-solid fa-caret-right"></i>
                  } */}
                </Nav.Link>



              </OverlayTrigger>
              {item.subMenu &&
                <ul className="dropdown-menu collapse animated fadeInLeft w-100" id={"subMenu" + index} role="menu">
                  {item.subMenu.map((subItem, i) =>
                    <Nav.Item as="li" key={i + "" + index}>
                      <OverlayTrigger
                        placement="right"
                        key={i + "" + index}
                        overlay={
                          <Tooltip id={"tooltip-" + i + "" + index}>
                            <strong>{subItem.subItemName}</strong>
                          </Tooltip>
                        }
                      >
                        <Nav.Link as={Link} eventKey={subItem.subItemURL} to={subItem.subItemURL}>
                          <i className={'fs-5 ' + subItem.subItemIcon}></i>
                          <span className={'ms-3 ' + spanHide}>{subItem.subItemName}</span>
                        </Nav.Link>
                      </OverlayTrigger>
                    </Nav.Item>
                  )}
                </ul>
              }
            </Nav.Item>
          )}


          

        </Nav>
      </nav>
    </>
  );
}
export default memo(SideBar);