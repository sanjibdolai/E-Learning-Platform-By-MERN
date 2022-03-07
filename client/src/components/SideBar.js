import { memo } from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from './Logo';
function SideBar(props) {
  const spanHide = props.sideBarProps.spanHide;
  const menuItems = props.menuItems;
  console.log("SideBar");
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-2 text-white bg-dark h-100" style={{ width: props.sideBarProps.width + 'px' }}>
        <Link to="/" className="d-flex align-items-center text-white text-decoration-none px-2">
          <Logo width="35rem" height="35rem" />
          <span className={'fs-4 ms-3 ' + spanHide}>E-Learning</span>
        </Link>
        <hr className="mb-5" />
        <Nav variant="pills" defaultActiveKey="0" className="flex-column mb-auto" >

          {menuItems.map((item, index) =>
            <Nav.Item key={index}>
              <OverlayTrigger
                placement="right"
                key={index}
                overlay={
                  <Tooltip id={"tooltip-"+index}>
                    <strong>{item.itemName}</strong>
                  </Tooltip>
                }
              >
                <Nav.Link as={Link} eventKey={index} to={item.itemURL} className="pe-1">
                  <i className={'fs-5 ' + item.iconClass}></i>
                  <span className={'ms-3 ' + spanHide}>{item.itemName}</span>
                </Nav.Link>
              </OverlayTrigger>
            </Nav.Item>
          )}

        </Nav>
      </div>
    </>
  );
}
export default memo(SideBar);