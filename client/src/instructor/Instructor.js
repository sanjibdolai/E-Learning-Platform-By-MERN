import { memo, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../components/UserLayout";

function Instructor() {

    const navigate=useNavigate();

    const [userDetails,setUserDetails]=useState({});

    const callInstructorPage = async () => {
        try {
            const res = await fetch("/instructor", {
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

    useEffect(() => {
        callInstructorPage();
    }, []);




    const menuItems = [
        { itemName: "Dashboard", itemURL: "/instructor", itemIcon: "fas fa-tachometer-alt" },
        {
            itemName: "Course", itemIcon: "fa-solid fa-book-open",
            subMenu: [
                { subItemName: "My Courses", subItemURL: "/instructor/mycourses", subItemIcon: "fa-solid fa-book-open-reader" },
                { subItemName: "Add Course", subItemURL: "/instructor/addcourse", subItemIcon: "fas fa-folder-plus" },
                // { subItemName: "Lessions", subItemURL: "/instructor/lessons", subItemIcon: "fas fa-plus-circle" },

            ]
        },
        { itemName: "Learners", itemURL: "/instructor/learners", itemIcon: "fa-solid fa-graduation-cap" },
        { itemName: "Profile", itemURL: "/instructor/profile", itemIcon: "far fa-address-card" },
        { itemName: "Settings", itemURL: "/instructor/settings", itemIcon: "fas fa-cogs" }
    ];
    return (
        <>
            <UserLayout menuItems={menuItems} />
        </>
    );
}

export default memo(Instructor);