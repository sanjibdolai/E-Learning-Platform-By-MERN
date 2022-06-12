import React, { memo, useState, useEffect, useContext } from 'react';
import { Dropdown, Stack } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { getUserDetails } from '../utilities/commonfunctions';

function AuthNav() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({});


    const logout = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!res.status === 200) {
                throw new Error(res.error)
            }
            dispatch({ type: 'USER_LOGOUT' });
            navigate("/");


        } catch (error) {
            console.log(error);
            alert(error);
        }

    }

    useEffect(() => {
        getUserDetails((data)=>setUserDetails(data));
    }, []);

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
                <span className='userProfileName' title={userDetails.name}>{userDetails.name}</span>
                {children}
            </Stack>

        </a>

    ));

    return (
        <Dropdown
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            onToggle={() => setIsClicked(!isClicked)}
            show={isClicked || isHovered}
            align={{ sm: 'end' }}
        >
            <Dropdown.Toggle as={CustomToggle} id="dropdown-profile-menu">

            </Dropdown.Toggle>
            <Dropdown.Menu style={{"margin-top":"0.5rem","min-width":"200px"}}>
                {state.userType === "INSTRUCTOR" &&
                
                    <Dropdown.Item as={Link} eventKey="/instructor" to="/instructor">Dashboard</Dropdown.Item>
                }

                <Dropdown.Item as={Link} {...state.userType === "INSTRUCTOR" ? {eventKey:"/instructor/profile", to:"/instructor/profile"} : {eventKey:"/learner/profile", to:"/learner/profile"}}>My Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => alert("Coming Soon...")}>Change Password</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        
        
    );
}
export default memo(AuthNav);