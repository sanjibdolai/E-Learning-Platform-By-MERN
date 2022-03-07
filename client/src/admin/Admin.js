import { memo, } from "react";
import UserLayout from "../components/UserLayout";

function Admin() {
    const menuItems = [
        { itemName: "Dashboard", itemURL: "/admin", iconClass: "fas fa-tachometer-alt" },
        { itemName: "Courses", itemURL: "/admin/courses", iconClass: "fa-brands fa-audible" },
        { itemName: "Instructors", itemURL: "/admin/instructors", iconClass: "fa-solid fa-graduation-cap" },
        { itemName: "Learners", itemURL: "/admin/learners", iconClass: "fa-solid fa-graduation-cap" },
        { itemName: "Profile", itemURL: "/admin/profile", iconClass: "far fa-address-card" },
        { itemName: "Settings", itemURL: "/admin/settings", iconClass: "fas fa-cogs" }
    ];
    const userDetails={name:"Sanjib Admin"}
    return (
        <>
        <UserLayout menuItems={menuItems} userDetails={userDetails}/>
        </>
    );
}

export default memo(Admin);