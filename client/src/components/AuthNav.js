import React, { useState } from 'react';
import { Dropdown, Stack } from "react-bootstrap";

function AuthNav() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

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
                <span className='userProfileName'>User Name Demo</span>
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
                <Dropdown.Item eventKey="1">My Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2">Change Password</Dropdown.Item>
                <Dropdown.Item eventKey="3" >Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default AuthNav;