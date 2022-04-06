import { memo } from 'react';
import { InputGroup, FormControl, Button, Form} from 'react-bootstrap';
function SearchBar({style, onClick}) {
    const btnClick=()=>{
        alert("Coming Soon...");
    }
    console.log("SearchBar");
    return (
        <Form.Group className="w-auto" style={style} >
        <InputGroup>
            <FormControl
                placeholder="Search..."
            />
            <Button variant="outline-info" onClick={onClick}>
            <i className="fas fa-search"></i>
            </Button>
        </InputGroup>
        </Form.Group>
    );
}
export default memo(SearchBar);