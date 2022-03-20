import { memo, } from "react";
import UserLayout from "../components/UserLayout";

function Learner() {
    const menuItems = [
        { itemName: "My Courses", itemURL: "/learner/courses", iconClass: "fa-brands fa-audible" },
        { itemName: "Profile", itemURL: "/learner/profile", iconClass: "far fa-address-card" },
        { itemName: "Settings", itemURL: "/learner/settings", iconClass: "fas fa-cogs" }
    ];
    const userDetails={name:"Learner Name"}
    return (
        <>
        <UserLayout menuItems={menuItems} userDetails={userDetails}/>
        </>
    );
}

export default memo(Learner);