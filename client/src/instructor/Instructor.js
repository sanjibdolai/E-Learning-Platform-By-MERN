import { memo, } from "react";
import UserLayout from "../components/UserLayout";

function Instructor() {
    const menuItems = [
        { itemName: "Dashboard", itemURL: "/instructor", iconClass: "fas fa-tachometer-alt" },
        { itemName: "My Courses", itemURL: "/instructor/mycourses", iconClass: "fa-brands fa-audible" },
        { itemName: "Add Course", itemURL: "/instructor/addcourse", iconClass: "fa fa-plus" },
        { itemName: "Learners", itemURL: "/instructor/learners", iconClass: "fa-solid fa-graduation-cap" },
        { itemName: "Profile", itemURL: "/instructor/profile", iconClass: "far fa-address-card" },
        { itemName: "Settings", itemURL: "/instructor/settings", iconClass: "fas fa-cogs" }
    ];
    const userDetails={name:"Sanjib Instructor"}
    return (
        <>
        <UserLayout menuItems={menuItems} userDetails={userDetails}/>
        </>
    );
}

export default memo(Instructor);