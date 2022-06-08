import { lazy, memo, Suspense, useEffect, useState, } from "react";
import { Button,ButtonGroup, Col, Container, Form, FormControl, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import Select from 'react-select';
import SearchBar from "../components/SearchBar";
import moment from "moment";
import { getEnrolledCourses } from "../utilities/commonfunctions";
import { useOutletContext } from "react-router-dom";
const CourseCard = lazy(() => import('./CourseCard'));
function Courses() {
    const [topNavTitle,setTopNavTitle]=useOutletContext();
    
    const [myCourses, setMyCourses] = useState([]);
    const sortByOptions = [
        { value: 'Recently Accessed', label: 'Recently Accessed' },
        { value: 'Recently Enrolled', label: 'Recently Enrolled' },
        { value: 'Title A - Z', label: 'Title A - Z' },
        { value: 'Title Z - A', label: 'Title Z - A' }
    ];
    const category = [
        { value: 'Programming Language', label: 'Programming Language' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Office', label: 'Office' }
    ];
    const subCategory = [
        { value: 'Java', label: 'Java' },
        { value: 'React', label: 'React' },
        { value: 'C#', label: 'C#' }
    ];
    useEffect(() => {
        setTopNavTitle(<h2>My Courses</h2>)
        getEnrolledCourses(setMyCourses);
        
        return;
    }, []);

    const sortBy=(e)=>{
        var courses=[...myCourses];
        if(e.value==='Title Z - A'){
            courses.sort((a,b)=> (a.courseTitle > b.courseTitle) ? 1 : ((b.courseTitle > a.courseTitle) ? -1 : 0)).reverse();
            
        }else if(e.value==='Title A - Z'){
            courses.sort((a,b)=> (a.courseTitle > b.courseTitle) ? 1 : ((b.courseTitle > a.courseTitle) ? -1 : 0));
        }else if(e.value==='Recently Enrolled'){
            courses.sort((a,b)=> moment(b.createdAt)-moment(a.createdAt));
            
        }
        setMyCourses(courses);
    }

    return (
        <>
            <Row className="mt-2"> 
                <Col lg="2">
                    <Form.Label>Sort By</Form.Label>
                    <Form.Group  >
                        <Select options={sortByOptions}
                        onChange={(e) => sortBy(e)}/>
                    </Form.Group>
                </Col>
                <Col lg="10">
                    <Row >
                    <Col xs="12">
                    <Form.Label>Filter By</Form.Label>
                    </Col>
                    <Form.Group as={Col}  >
                        <Select options={category}
                        onChange={(e) => console.log("Hello")}/>
                    </Form.Group>
                    <Form.Group as={Col}  >
                        <Select options={category}
                        onChange={(e) => console.log("Hello")}/>
                    </Form.Group>
                    <Form.Group as={Col}  >
                        <Select options={category}
                        onChange={(e) => console.log("Hello")}/>
                    </Form.Group>
                    <Form.Group as={Col} >
                        <InputGroup>
                            <FormControl
                                placeholder="Search..."
                            />
                            <Button variant="outline-info" >
                            <i className="fas fa-search"></i>
                            </Button>
                        </InputGroup>
                    </Form.Group>     
                    </Row>
                </Col>
            </Row>
            <Row>
                <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                    {myCourses.map((item,index)=>
                    <>
                        <Col key={index} lg={3} md={4} sm={6} className="mt-3">
                            <CourseCard  item={item}/>
                        </Col>
                    </>
                    )}
                </Suspense>
            </Row>
        
        </>
    );
}

export default memo(Courses);