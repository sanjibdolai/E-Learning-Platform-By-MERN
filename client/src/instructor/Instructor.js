import { memo, } from "react";
import UserLayout from "../components/UserLayout";

function Instructor() {
    const menuItems = [
        { itemName: "Dashboard", itemURL: "/instructor", itemIcon: "fas fa-tachometer-alt" },
        {
            itemName: "Course", itemIcon: "fa-solid fa-book-open",
            subMenu: [
                { subItemName: "My Courses", subItemURL: "/instructor/mycourses", subItemIcon: "fa-solid fa-book-open-reader" },
                { subItemName: "Add Course", subItemURL: "/instructor/addcourse", subItemIcon: "fas fa-folder-plus" },
                { subItemName: "Lessions", subItemURL: "/instructor/lessons", subItemIcon: "fas fa-plus-circle" },

            ]
        },
        { itemName: "Learners", itemURL: "/instructor/learners", itemIcon: "fa-solid fa-graduation-cap" },
        { itemName: "Profile", itemURL: "/instructor/profile", itemIcon: "far fa-address-card" },
        { itemName: "Settings", itemURL: "/instructor/settings", itemIcon: "fas fa-cogs" }
    ];
    const userDetails = { name: "Sanjib Instructor" }
    return (
        <>
            <UserLayout menuItems={menuItems} userDetails={userDetails} />
        </>
    );
}

export default memo(Instructor);