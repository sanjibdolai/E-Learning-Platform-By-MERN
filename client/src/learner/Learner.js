import { memo, } from "react";
import UserLayout from "../components/UserLayout";

function Learner() {
    const menuItems = [
        { itemName: "My Courses", itemURL: "/learner/courses", itemIcon: "fa-brands fa-audible" },
        { itemName: "Profile", itemURL: "/learner/profile", itemIcon: "far fa-address-card" },
        { itemName: "Settings", itemURL: "/learner/settings", itemIcon: "fas fa-cogs" }
    ];

    return (
        <>
        <UserLayout menuItems={menuItems} pageType="Learner" />
        </>
    );
}

export default memo(Learner);