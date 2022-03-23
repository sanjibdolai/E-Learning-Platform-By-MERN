import React, { memo, useState,useEffect, useContext } from 'react';
import { Dropdown, Stack } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function AuthNav() {
    const navigate=useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [userDetails,setUserDetails]=useState({});

    const callInstructorPage = async () => {
        try {
            const res = await fetch("/userdata", {
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
            const data = await res.json();
            setUserDetails(data);
            console.log(data);

        } catch (error) {
            console.log(error);
            navigate("/login");
        }


    }

    const logout=async () => {
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
        callInstructorPage();
    }, []);

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
                <span className='userProfileName'>{userDetails.name}</span>
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
                <Dropdown.Item eventKey="3" onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default memo(AuthNav);