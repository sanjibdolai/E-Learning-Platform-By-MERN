import { memo } from "react";

function Logo(props){
    console.log("Logo");
    return (
        <>
         <img
                        alt="Logo"
                        src="/logo.png"
                        width={props.width}
                        height={props.height}
                        className={props.className}
                    />
        </>
    );
}
export default memo(Logo);