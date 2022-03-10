import { memo, useState, useRef } from "react";
import { Container, Col, Row, Form, InputGroup, Button } from "react-bootstrap";
import { CKEditor } from 'ckeditor4-react';
import Select from 'react-select';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

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

    return (
        <Container>
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
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label class="form-check-label" for="inlineRadio1">Free</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label class="form-check-label" for="inlineRadio2">Paid</label>
                            </div>
                        </Col>
                        <Col xs="6">
                            <InputGroup>
                                <Form.Control type="text" placeholder="Enter Course Price" />
                                <InputGroup.Text id="basic-addon1"><i class="fa-solid fa-rupee-sign"></i></InputGroup.Text>
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
            <Row className="border p-2 mt-2">
                <Col lg={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Chapter/ Topic Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title Here..." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Content</Form.Label>
                        <CKEditor
                            initData={""}
                            onInstanceReady={() => {
                                console.log('Editor is ready!');
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col lg={6}>
                <Form.Group as={Row} className="mb-3">
                        <Form.Label>Videos Upload</Form.Label>
                        <Col xs='9'>
                        <Form.Control type="file" />
                        </Col>
                        <Col xs='3'>
                            <Button variant="outline-info" size="sm"><i class="fa fa-plus"></i> Add More</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label>Notes Upload</Form.Label>
                        <Col xs='9'>
                        <Form.Control type="file" />
                        </Col>
                        <Col xs='3'>
                            <Button variant="outline-info" size="sm"><i class="fa fa-plus"></i> Add More</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Important Links</Form.Label>
                        <Col xs='9'>
                            <Form.Control type="text" placeholder="Link Paste Here..." />
                        </Col>
                        <Col xs='3'>
                            <Button variant="outline-info" size="sm"><i class="fa fa-plus"></i> Add More</Button>
                        </Col>

                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Button variant="info" ><i class="fa fa-plus"></i> Add A New Chapter</Button>
                </Col>
            </Row>
        </Container >
    );
}
export default memo(AddCourse);