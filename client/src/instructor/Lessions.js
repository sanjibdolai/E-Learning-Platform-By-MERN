import { useState, useEffect } from "react";


function Lessions() {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        async function getRecords() {
            const response = await fetch("/instructor/lessons");

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            console.log(records);
            setRecords(records);
        }

        getRecords();

        return;
    }, []);

    return (
        <>
            {records.map(item =>
                <h1>{item.name}</h1>
            )}
        </>
    );
}
export default Lessions;