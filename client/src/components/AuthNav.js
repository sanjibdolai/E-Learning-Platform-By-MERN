import React, { memo, useState } from 'react';
import { Dropdown, Stack } from "react-bootstrap";

function AuthNav(props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    console.log("AuthNav");
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-decoration-none"
        >
            <Stack direction="horizontal" gap={2}>
                <img
                    alt=""
                    src="/user.png"
                    width="40rem"
                    height="40rem"
                    className="rounded-pill"
                />
                <span className='userProfileName'>{props.userDetails.name}</span>
                {children}
            </Stack>
           
        </a>

    ));

    return (
        <Dropdown
            //onMouseEnter={() => setIsHovered(true)}
            //onMouseLeave={() => setIsHovered(false)}
            onToggle={() => setIsClicked(!isClicked)}
            show={isClicked || isHovered}
        >
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">

            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={()=> alert("Coming Soon...")}>My Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={()=> alert("Coming Soon...")}>Change Password</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={()=> alert("Coming Soon...")}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default memo(AuthNav);