import { memo, useState, useRef, useContext } from "react";
import { Container, Col, Row, Form, InputGroup, Button, Modal, ListGroup, Accordion, Card, useAccordionButton, Stack, AccordionContext } from "react-bootstrap";
import Select from 'react-select';
import swal from 'sweetalert';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Link, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";


function CustomToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <h5
            className="w-100 h-100 me-auto my-0 py-2 px-3"
            onClick={decoratedOnClick}
        >
            <i className={isCurrentEventKey ? "fa-solid fa-angles-up" : "fa-solid fa-angles-down"}></i>
            {children}
        </h5>
    );
}
function AddCourse() {

    const navigate = useNavigate();


    const [course, setCourse] = useState({ courseCategory: null, courseSubCategory: null });
    const [topics, setTopics] = useState([]);
    const topicInitialState = { topicName: "", topicDescription: "", lessions: [] };
    const [topic, setTopic] = useState(topicInitialState);
    const lessionInitialState = { lessionTitle: "", lessionPreview: false, lessionContent: "", lessionDuration: '', lessionVideoURL: "" };
    const [lession, setLession] = useState(lessionInitialState);
    const [editTopic, setEditTopic] = useState(false);
    const [editLession, setEditLession] = useState(false);
    const [currentTopic, setCurrentTopic] = useState(-1);
    const [currentLession, setCurrentLession] = useState(-1);
    const [show, setShow] = useState(false);
    const [showLessionModal, setShowLessionModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);



    //Course
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
    const handleCourseDetailsInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCourse({ ...course, [name]: value });
        console.log(course);
    }
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
        setCourse({ ...course, courseImage: e.target.files[0] });
    };
    const cropperRef = useRef();
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        //console.log(cropper.getCroppedCanvas().toDataURL());
    };

    //Topic
    const addTopicClick = (e) => {
        e.preventDefault();
        setTopics([...topics, topic]);
        setShow(false);
        setTopic({ ...topicInitialState });
    }
    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setTopic({ ...topic, [name]: value });
    }
    const updateTopicClick = (e) => {
        e.preventDefault();
        let allTopics = [...topics];
        allTopics[currentTopic] = { ...topic };
        setTopics([...allTopics]);
        setShow(false);
        setTopic({ ...topicInitialState });
    }
    const deleteTopicClick = (e, index) => {
        e.preventDefault();
        let allTopics = [...topics];
        allTopics.splice(index, 1);
        setTopics([...allTopics]);
    }
    //Lession
    // const [lessions, setLessions] = useState([]);
    const handleLessionModalInputs = (e) => {
        let name = e.target.name;
        let value;
        if (e.target.type === "file") {
            swal("Comming Soon...");
            // value = e.target.files[0];
            // setLession({ ...lession, [name]: value });
        } else if (name === "lessionPreview") {
            value = e.target.checked;
            setLession({ ...lession, [name]: value });
        } else {
            value = e.target.value;
            setLession({ ...lession, [name]: value });
        }

    }
    const handleLessionContentCKEditor = (e) => {
        let value = e.editor.getData();
        console.log(value)
        setLession({ ...lession, "lessionContent": value })
    }
    const addLessionHandleClick = (e) => {
        e.preventDefault();
        const allTopics = [...topics];
        let lessions = [...allTopics[currentTopic].lessions];
        lessions.push(lession);
        allTopics[currentTopic].lessions = lessions;
        setTopics(allTopics);
        setShowLessionModal(false);
        setLession({ ...lessionInitialState });

    }

    const updateLessionHandleClick = (e) => {
        e.preventDefault();
        let allLessions = [...topics[currentTopic].lessions];
        allLessions[currentLession] = { ...lession };
        let allTopics = [...topics];
        allTopics[currentTopic].lessions = allLessions;
        setTopics([...allTopics]);
        setShowLessionModal(false);
        setLession({ ...lessionInitialState });
    }
    const deleteLessionHandleClick = (e, topicIndex, lessionIndex) => {
        e.preventDefault();
        let allTopics = [...topics];
        allTopics[topicIndex].lessions.splice(lessionIndex, 1);
        setTopics([...allTopics]);
    }

    const postCourseData = async (e) => {
        e.preventDefault();
        console.log(course);
        var form_data = new FormData();

        for (var key in course) {
            form_data.append(key, course[key]);
        }
        form_data.append("topics", JSON.stringify(topics));


        //form_data.append("course",JSON.stringify(course))

        const res = await fetch("/instructor/addcourse", {
            method: "POST",

            credentials: "include",
            body: form_data
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            alert("Invalid.");
            console.log("Invalid.");
        } else {
            console.log("Successfully Added.");
            swal("Good job!", "Your Course Added Successfully", "success").then((value) => {
                navigate("/instructor");
            });

        }
    }


    return (
        <Container fluid>
            <form encType="multipart/form-data" method="post">
                {/* Start Course Deatils */}
                <Card className="mt-2">
                    <Card.Header as="h5">Course Details</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Course Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Course Title"
                                        name="courseTitle"
                                        value={course.courseTitle}
                                        onChange={handleCourseDetailsInputs}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Course Category</Form.Label>
                                    <Select options={category}
                                        onChange={(e) => setCourse({ ...course, courseCategory: e.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Course Sub Category</Form.Label>
                                    <Select options={subCategory}
                                        onChange={(e) => setCourse({ ...course, courseSubCategory: e.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Course Description</Form.Label>
                                    <textarea className="form-control" rows="6" placeholder="Enter Course Description"
                                        name="courseDescription"
                                        value={course.courseDescription}
                                        onChange={handleCourseDetailsInputs}
                                    />
                                </Form.Group>

                            </Col>
                            <Col lg={6}>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Course Price</Form.Label>
                                    <Col xs="4" className="pt-2">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio"
                                                name="courseType"
                                                value="Free"
                                                checked={course.courseType === "Free"}
                                                onChange={handleCourseDetailsInputs}
                                            />
                                            <label className="form-check-label" >Free</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio"
                                                name="courseType"
                                                value="Paid"
                                                checked={course.courseType === "Paid"}
                                                onChange={handleCourseDetailsInputs}
                                            />
                                            <label className="form-check-label" >Paid</label>
                                        </div>
                                    </Col>
                                    <Col xs="6">
                                        {course.courseType === "Paid" &&
                                            <InputGroup>
                                                <Form.Control type="text" placeholder="Enter Course Price"
                                                    name="coursePrice"
                                                    value={course.coursePrice}
                                                    onChange={handleCourseDetailsInputs}
                                                />
                                                <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-rupee-sign"></i></InputGroup.Text>
                                            </InputGroup>
                                        }
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label>Difficulty Level</Form.Label>
                                    <Col xs="12" className="pt-2">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio"
                                                name="difficultyLevel"
                                                value="Beginner"
                                                checked={course.difficultyLevel === "Beginner"}
                                                onChange={handleCourseDetailsInputs}
                                            />
                                            <label className="form-check-label" >Beginner</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio"
                                                name="difficultyLevel"
                                                value="Intermediate"
                                                checked={course.difficultyLevel === "Intermediate"}
                                                onChange={handleCourseDetailsInputs}
                                            />
                                            <label className="form-check-label" >Intermediate</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio"
                                                name="difficultyLevel"
                                                value="Advance"
                                                checked={course.difficultyLevel === "Advance"}
                                                onChange={handleCourseDetailsInputs}
                                            />
                                            <label className="form-check-label" >Advance</label>
                                        </div>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Course Image</Form.Label>
                                    <input className="form-control"
                                        accept="image/*"
                                        type="file"
                                        name="courseImage"
                                        onChange={imageChange}
                                    />
                                </Form.Group>
                                <Container className="bg-secondary shadow mb-3 p-0" style={{ height: "250px", width: "400px" }}>

                                    <Cropper
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : "/demo.jpg"}
                                        alt="Banner Image"
                                        style={{ height: "100%", width: "100%" }}
                                        aspectRatio={16 / 9}
                                        guides={true}
                                        crop={onCrop}
                                        ref={cropperRef}
                                    />
                                </Container>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {/* End Course Deatils */}

                {/* Start Course Builder */}
                <Card className="mt-2">
                    <Card.Header as="h5">Course Builder</Card.Header>
                    <Card.Body>
                        {/* Start Topic Details */}
                        <Row>
                            <Col>
                                <Accordion>
                                    {topics.map((topic, index) =>
                                        <Card key={index}>
                                            <Card.Header className="p-0">
                                                <Stack direction="horizontal" gap={2}>
                                                    <CustomToggle
                                                        eventKey={"topic" + index}

                                                    >
                                                        <span className="ms-3">Section {index + 1}: {topic.topicName}</span>
                                                    </CustomToggle>

                                                    <Button size="sm" variant="success"
                                                        onClick={() => {
                                                            setTopic({ ...topics[index] });
                                                            setShow(true);
                                                            setEditTopic(true);
                                                            setCurrentTopic(index);
                                                        }}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <Button size="sm" variant="danger" className="me-2"
                                                        onClick={(e) => deleteTopicClick(e, index)}
                                                    >
                                                        <i className="fa-solid fa-trash-can">
                                                        </i></Button>
                                                </Stack>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={"topic" + index}>

                                                {/* Start Lession Details */}
                                                <Card.Body>
                                                    <ListGroup as="ol" numbered>
                                                        {topic.lessions.map((lession, inx) =>

                                                            <ListGroup.Item
                                                                as="li"
                                                                className="d-flex "
                                                                key={inx}
                                                            >
                                                                <div className="p-0 flex-grow-1 bd-highlight">
                                                                    <h6 className="px-2">{lession.lessionTitle}</h6>
                                                                    <span className="px-2"><i className="fa-solid fa-circle-play"></i> {lession.lessionDuration}min</span>
                                                                </div>
                                                                <div className="p-2 bd-highlight">
                                                                    <Button size="sm" variant="success"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setLession(topics[index].lessions[inx]);
                                                                            setEditLession(true);
                                                                            setCurrentLession(inx);
                                                                            setShowLessionModal(true);
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </Button>
                                                                </div>
                                                                <div className="p-2 bd-highlight">
                                                                    <Button size="sm" variant="danger"
                                                                        onClick={(e) => {
                                                                            deleteLessionHandleClick(e, index, inx);
                                                                        }}
                                                                    >
                                                                        <i className="fa-solid fa-trash-can"></i>
                                                                    </Button>
                                                                </div>


                                                            </ListGroup.Item>

                                                        )}
                                                    </ListGroup>
                                                    <Button
                                                        className="mt-2"
                                                        onClick={() => { setCurrentTopic(index); setShowLessionModal(true); }}>
                                                        <i className="fa fa-plus"></i> Add Lession
                                                    </Button>

                                                </Card.Body>
                                                {/* End Lession Details */}

                                            </Accordion.Collapse>
                                        </Card>
                                    )}
                                </Accordion>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Button className="mt-2"
                                    onClick={() => setShow(true)}>
                                    <i className="fa fa-plus"></i> Add Topic
                                </Button>

                            </Col>

                        </Row>
                        {/* End Topic Details */}
                    </Card.Body>
                </Card>
                {/* End Course Builder */}

                {/* Start Buttons */}
                <Card className="mt-2 mb-2">
                    <Card.Body className="p-2">
                        < Row  >
                            <Col className="text-end">
                                <Button variant="info" className="ms-4" onClick={postCourseData}><i className="fas fa-save"></i> Save</Button>
                                <Button variant="danger" className="ms-4" onClick={() => navigate("/instructor")}>
                                    <i className="fas fa-times"></i> Cancel
                                </Button>
                            </Col>
                        </Row >
                    </Card.Body>
                </Card>
                {/* End Buttons */}
            </form>
            <Modal show={show} onHide={() => {
                setShow(false);
                setTopic({ ...topicInitialState });
                setEditTopic(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Topic Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Topic Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Topic Name"
                                        name="topicName"
                                        value={topic.topicName}
                                        onChange={handleInputs}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Topic Description</Form.Label>
                                    <textarea className="form-control" rows="4" placeholder="Enter Topic Description"
                                        name="topicDescription"
                                        value={topic.topicDescription}
                                        onChange={handleInputs}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    {editTopic ?
                        <Button variant="info" onClick={updateTopicClick}>
                            <i className="fa fa-edit"></i> Update Topic
                        </Button>
                        :
                        <Button variant="info" onClick={addTopicClick}>
                            <i className="fa fa-plus"></i> Add Topic
                        </Button>
                    }

                </Modal.Footer>
            </Modal>
            <Modal
                show={showLessionModal}
                onHide={() => {
                    setShowLessionModal(false);
                    setLession({ ...lessionInitialState });
                    setEditLession(false);
                }}
                dialogClassName="mw-100 modal-1000w"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Lession Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-86vh">
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Lession Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Lession Title Here..."
                                        name="lessionTitle"
                                        value={lession.lessionTitle}
                                        onChange={handleLessionModalInputs}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Content</Form.Label>

                                    <Editor
                                        content={lession.lessionContent}
                                        onEditorChange={handleLessionContentCKEditor}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Video URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Paste Video URL..."
                                        name="lessionVideoURL"
                                        value={lession.lessionVideoURL}
                                        onChange={handleLessionModalInputs}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Video Upload</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="lessionVideoFile"
                                        onChange={handleLessionModalInputs}
                                    />

                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" >
                                    <Col xs="7">
                                        <Form.Label>Lession Duration (Minutes)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Lession Duration Here..."
                                            name="lessionDuration"
                                            value={lession.lessionDuration}
                                            onChange={handleLessionModalInputs}
                                        />
                                    </Col>
                                    <Col xs="5">
                                        <Form.Label>Lession Preview</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            id="lessionPreview"
                                            label="Yes"
                                            name="lessionPreview"
                                            value={lession.lessionPreview}
                                            checked={lession.lessionPreview}
                                            onChange={handleLessionModalInputs}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Resources Upload</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="lessionResourcesFile"
                                        onChange={handleLessionModalInputs}
                                    />
                                </Form.Group>

                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLessionModal(false)}>
                        Close
                    </Button>
                    {editLession ?
                        <Button variant="info" onClick={updateLessionHandleClick}>
                            <i className="fa fa-edit"></i> Update
                        </Button>
                        :
                        <Button variant="info" onClick={addLessionHandleClick}>
                            <i className="fa fa-plus"></i> Add
                        </Button>
                    }

                </Modal.Footer>
            </Modal>
        </Container >

    );
}
export default memo(AddCourse);