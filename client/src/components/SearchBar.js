import { memo } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
function SearchBar() {
    const btnClick=()=>{
        alert("Coming Soon...");
    }
    console.log("SearchBar");
    return (
        <InputGroup>
            <FormControl
                placeholder="Search..."
            />
            <Button variant="outline-info" onClick={btnClick}>
            <i className="fas fa-search"></i>
            </Button>
        </InputGroup>
    );
}
export default memo(SearchBar);