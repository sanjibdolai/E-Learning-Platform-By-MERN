import { memo, useState, useRef } from "react";
import { Container, Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import Select from 'react-select';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import AddChapter from "./AddChapter"

function AddCourse() {
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

    const [chapters, setChapters] = useState([]);
    const handleChaptersAddClick = () => {
        setChapters([...chapters, { chapter: "abc" }]);
    };

    return (
        <Container fluid>
            <Row className="border p-2">
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
                    <Container style={{ height: "300px" }}>
                        {selectedImage &&
                            <Cropper
                                src={URL.createObjectURL(selectedImage)}
                                style={{ height: "100%", width: "100%" }}
                                aspectRatio={16 / 9}
                                guides={true}
                                crop={onCrop}
                                ref={cropperRef}
                            />
                        }
                    </Container>

                </Col>
            </Row>
            <AddChapter />
            {chapters.map((item, index) => {
                return <AddChapter key={index} />;
            }
            )}


            <Row className="border p-2 mt-2">
                <Col className="text-center">
                    <Button variant="info" onClick={handleChaptersAddClick}><i className="fa fa-plus"></i> Add A New Chapter</Button>
                </Col>
            </Row>
        </Container >
    );
}
export default memo(AddCourse);