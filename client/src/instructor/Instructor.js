import { memo, } from "react";
import UserLayout from "../components/UserLayout";

function Instructor() {
    const menuItems = [
        { itemName: "Dashboard", itemURL: "/instructor", iconClass: "fas fa-tachometer-alt" },
        { itemName: "My Courses", itemURL: "/instructor/courses", iconClass: "fa-brands fa-audible" },
        { itemName: "Students", itemURL: "/instructor/students", iconClass: "fa-solid fa-graduation-cap" },
        { itemName: "Profile", itemURL: "/instructor/profile", iconClass: "far fa-address-card" },
        { itemName: "Settings", itemURL: "/instructor/settings", iconClass: "fas fa-cogs" }
    ];
    const userDetails={name:"Sanjib Dolai"}
    return (
        <>
        <UserLayout menuItems={menuItems} userDetails={userDetails}/>
        </>
    );
}

export default memo(Instructor);