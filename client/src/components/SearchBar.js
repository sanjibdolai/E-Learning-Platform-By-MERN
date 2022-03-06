import { memo } from 'react';
import {Form, FormControl, Button } from 'react-bootstrap';
function SearchBar() {
    console.log("SearchBar");
    return (
        <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Search..."
                className=""
                aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
        </Form>
    );
}
export default memo(SearchBar);