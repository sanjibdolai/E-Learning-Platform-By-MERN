import { memo, useState, useRef, useContext } from "react";
import { CKEditor } from 'ckeditor4-react';
import { Container, Col, Row, Form, InputGroup, Button, Modal, ListGroup, Accordion, Card, useAccordionButton, Stack, AccordionContext } from "react-bootstrap";
import Select from 'react-select';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import AddChapter from "./AddChapter"
import { Link, useNavigate } from "react-router-dom";


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
            style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
        >
            {children}
        </h5>
    );
}
function AddCourse() {

    const history = useNavigate();
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
    const [selectedImage, setSelectedImage] = useState(null);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };
    const cropperRef = useRef();
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        //console.log(cropper.getCroppedCanvas().toDataURL());
    };

    //Topic
    const [topic, setTopic] = useState({});
    const [topics, setTopics] = useState([]);
    const [show, setShow] = useState(false);
    const addTopicClick = (e) => {
        e.preventDefault();
        setTopics([...topics, topic])
    }
    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setTopic({ ...topic, [name]: value })
    }

    //Lession
    const [lession, setLession] = useState({});
    const [lessions, setLessions] = useState([]);
    const [showLessionModal, setShowLessionModal] = useState(false);
    const handleLessionModalInputs = (e) => {
        let name = e.target.name;
        let value;
        if (e.target.type === "file") {
            value = e.target.files[0];
            setLession({ ...lession, [name]: value })
        } else {
            value = e.target.value;
            setLession({ ...lession, [name]: value })
        }
    }
    const handleLessionContentCKEditor = (e) => {
        let value = e.editor.getData();
        setLession({ ...lession, "lessionContent": value })
    }
    const handleInstanceReady = ({ editor }) => {
        editor.setData(lession.lessionContent);
    };
    const addLessionHandleClick = (e) => {
        e.preventDefault();
        setLessions([...lessions, lession]);
        setShowLessionModal(false);
    }

    const [uploadVideos, setUploadVideos] = useState([]);
    const handleVideosAddClick = () => {
        setUploadVideos([...uploadVideos, { video: "abc" }]);
    };
    const handleVideosRemoveClick = index => {
        const list = [...uploadVideos];
        list.splice(index, 1);
        setUploadVideos(list);
    };
    const [uploadFiles, setUploadFiles] = useState([]);
    const handleFilesAddClick = () => {
        setUploadFiles([...uploadFiles, { file: "abc" }]);
    };
    const handleFilesRemoveClick = index => {
        const list = [...uploadFiles];
        list.splice(index, 1);
        setUploadFiles(list);
    };

    const [importantLinks, setImportantLinks] = useState([]);
    const handleImportantLinksAddClick = () => {
        setImportantLinks([...importantLinks, { importantLink: "abc" }]);
    };
    const handleImportantLinksRemoveClick = index => {
        const list = [...importantLinks];
        list.splice(index, 1);
        setImportantLinks(list);
    };

    return (
        <Container fluid>
            <Card className="mt-2">
                <Card.Header as="h5">Course Details</Card.Header>
                <Card.Body>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Course Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Course Title" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Course Category</Form.Label>
                                <Select options={category} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Course Sub Category</Form.Label>
                                <Select options={subCategory} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Course Description</Form.Label>
                                <textarea className="form-control" rows="4" placeholder="Enter Course Description" />
                            </Form.Group>

                        </Col>
                        <Col lg={6}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label>Course Price</Form.Label>
                                <Col xs="4" className="pt-2">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                        <label className="form-check-label" >Free</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                        <label className="form-check-label" >Paid</label>
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <InputGroup>
                                        <Form.Control type="text" placeholder="Enter Course Price" />
                                        <InputGroup.Text id="basic-addon1"><i className="fa-solid fa-rupee-sign"></i></InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Course Image</Form.Label>
                                <input className="form-control"
                                    accept="image/*"
                                    type="file"
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
            <Card className="mt-2">
                <Card.Header as="h5">Course Builder</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Accordion>
                                {topics.map((topic, index) =>
                                    <Card key={index}>
                                        <Card.Header className="p-0">
                                            <Stack direction="horizontal" gap={2}>
                                                <CustomToggle eventKey={"topic" + index} >Section {index + 1}: {topic.topicName}</CustomToggle>
                                                
                                                <Button size="sm" variant="success" ><i className="fas fa-edit"></i></Button>
                                                <Button size="sm" variant="danger" ><i className="fa-solid fa-trash-can"></i></Button>
                                                
                                                <span className="mx-3"><i className="fa-solid fa-angle-down"></i></span>
                                            </Stack>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={"topic" + index}>
                                            <Card.Body>
                                                <ListGroup as="ol" numbered>
                                                    {topic.lessions && topic.lessions.map((lession, inx) =>

                                                        <ListGroup.Item
                                                            as="li"
                                                            className="d-flex "
                                                            key={inx}
                                                        >
                                                            <div className="p-0 flex-grow-1 bd-highlight">
                                                                <h6 className="px-2">{lession.lessionName}</h6>
                                                                <span className="px-2"><i class="fa-solid fa-circle-play"></i> 30min</span>
                                                            </div>
                                                            <div className="p-2 bd-highlight">
                                                                <Button size="sm" variant="success" ><i className="fas fa-edit"></i></Button>
                                                            </div>
                                                            <div className="p-2 bd-highlight">
                                                                <Button size="sm" variant="danger" ><i className="fa-solid fa-trash-can"></i></Button>
                                                            </div>


                                                        </ListGroup.Item>

                                                    )}
                                                </ListGroup>


                                                <Button onClick={() => setShowLessionModal(true)}><i className="fa fa-plus"></i> Add Lession</Button>


                                                <Modal
                                                    show={showLessionModal}
                                                    onHide={() => setShowLessionModal(false)}
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
                                                                        <CKEditor
                                                                            initData={""}
                                                                            onInstanceReady={handleInstanceReady}
                                                                            onChange={handleLessionContentCKEditor}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group className="mb-3" >
                                                                        <Form.Label>Video URL</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Paste Video URL..."
                                                                            name="lessionVideoURL"
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

                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label>Resources Upload</Form.Label>
                                                                        <Form.Control
                                                                            type="file"
                                                                            name="lessionResourcesFile"
                                                                            onChange={handleLessionModalInputs}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group as={Row} className="mb-3" >
                                                                        <Form.Label>Important Links</Form.Label>
                                                                        <Col xs='9'>
                                                                            <Form.Control type="text" placeholder="Link Paste Here..."
                                                                                name="lessionImportantLinks"
                                                                                value={lession.lessionImportantLinks}
                                                                                onChange={handleLessionModalInputs}
                                                                            />
                                                                        </Col>
                                                                        <Col xs='3'>
                                                                            <Button variant="outline-info" size="sm" onClick={handleImportantLinksAddClick}><i className="fa fa-plus"></i> Add More</Button>
                                                                        </Col>

                                                                    </Form.Group>
                                                                    {importantLinks.map((item, index) => {
                                                                        return (
                                                                            <Form.Group as={Row} key={index} className="mb-3">
                                                                                <Col xs='9'>
                                                                                    <Form.Control type="text" placeholder="Link Paste Here..." />
                                                                                </Col>
                                                                                <Col xs='3'>
                                                                                    <span className="text-danger spanRemoveBtn align-middle" onClick={() => handleImportantLinksRemoveClick(index)} ><i className="far fa-times-circle align-middle fs-5"></i></span>
                                                                                </Col>
                                                                            </Form.Group>
                                                                        );
                                                                    })}
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => setShowLessionModal(false)}>
                                                            Close
                                                        </Button>
                                                        <Button variant="outline-info" onClick={addLessionHandleClick}>
                                                            <i className="fa fa-plus"></i> Add Lession
                                                        </Button>

                                                    </Modal.Footer>
                                                </Modal>


                                            </Card.Body>

                                        </Accordion.Collapse>
                                    </Card>
                                )}
                            </Accordion>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={() => setShow(true)}>
                                <i className="fa fa-plus"></i> Add Topic
                            </Button>
                            <Modal show={show} onHide={() => setShow(false)}>
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
                                                        value={topics.topicName}
                                                        onChange={handleInputs}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label>Topic Description</Form.Label>
                                                    <textarea className="form-control" rows="4" placeholder="Enter Topic Description"
                                                        name="topicDescription"
                                                        value={topics.topicDescription}
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
                                    <Button variant="outline-info" onClick={addTopicClick}>
                                        <i className="fa fa-plus"></i> Add Topic
                                    </Button>

                                </Modal.Footer>
                            </Modal>
                        </Col>

                    </Row>
                </Card.Body>
            </Card>


            < Row className="border p-2 mt-2" >
                <Col className="text-end">
                    <Button variant="info" className="ms-4"><i className="fas fa-save"></i> Save</Button>
                    <Button variant="danger" className="ms-4" onClick={() => history(0)}>
                        <i className="fas fa-times"></i> Cancel
                    </Button>
                </Col>
            </Row >
        </Container >

    );
}
export default memo(AddCourse);