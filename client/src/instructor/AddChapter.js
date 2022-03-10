import { CKEditor } from 'ckeditor4-react';
import { memo, useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
function AddChapter() {
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
        <>
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
                            <Button variant="outline-info" size="sm" onClick={handleVideosAddClick}><i className="fa fa-plus"></i> Add More</Button>
                        </Col>
                    </Form.Group>
                    {uploadVideos.map((item, index) => {
                        return (
                            <Form.Group as={Row} key={index} className="mb-3">
                                <Col xs='9'>
                                    <Form.Control type="file" />
                                </Col>
                                <Col xs='3'>
                                    <span className="text-danger align-middle" onClick={() => handleVideosRemoveClick(index)} ><i className="far fa-times-circle align-middle fs-5"></i></span>
                                </Col>
                            </Form.Group>
                        );
                    })}
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label>Notes Upload</Form.Label>
                        <Col xs='9'>
                            <Form.Control type="file" />
                        </Col>
                        <Col xs='3'>
                            <Button variant="outline-info" size="sm" onClick={handleFilesAddClick}><i className="fa fa-plus"></i> Add More</Button>
                        </Col>
                    </Form.Group>
                    {uploadFiles.map((item, index) => {
                        return (
                            <Form.Group as={Row} key={index} className="mb-3">
                                <Col xs='9'>
                                    <Form.Control type="file" />
                                </Col>
                                <Col xs='3'>
                                    <span className="text-danger align-middle" onClick={() => handleFilesRemoveClick(index)} ><i className="far fa-times-circle align-middle fs-5"></i></span>
                                </Col>
                            </Form.Group>
                        );
                    })}
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Important Links</Form.Label>
                        <Col xs='9'>
                            <Form.Control type="text" placeholder="Link Paste Here..." />
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
                                    <span className="text-danger align-middle" onClick={() => handleImportantLinksRemoveClick(index)} ><i className="far fa-times-circle align-middle fs-5"></i></span>
                                </Col>
                            </Form.Group>
                        );
                    })}
                </Col>
            </Row>
            <Row>
            </Row>
        </>
    );
}
export default memo(AddChapter);