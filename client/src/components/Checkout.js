import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

function Checkout(){

    const [cartItems, setCartItems] = useState([]);
    const getCartItems = async () => {
        try {
            const res = await fetch("/api/carts", {
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
            setCartItems(data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCartItems();
        return;
    }, []);
    


    return(
       <>
       </>
    );
}

export default Checkout;