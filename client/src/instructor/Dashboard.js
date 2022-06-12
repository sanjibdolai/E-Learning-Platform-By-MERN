import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CourseCard from "./CourseCard";
import { getInstructorCourses } from '../utilities/commonfunctions';
import { currencyFormat } from '../utilities/util';
function Dashboard() {
    
    const [courses, setCourses] = useState([]);

    

    useEffect(() => {
        getInstructorCourses((data)=>{setCourses(data)});
    }, []);

    return (
        <>
            <div className="row dashboard-cards">
                <div className="col-lg-3">

                    <div className="ibox-content service-card">
                        <h5 className="text-center">Courses</h5>
                        <div className="row p-0 m-0">
                            <div className="col-5">
                                <span className="lm-icon-wrapper">
                                    <img id="imgService" src="/online-course.png" className="lm-icon-size" />
                                </span>
                            </div>
                            <div className="col-7 text-end pt-2">
                                <h1>{courses.length}</h1>
                                <h4>Total Courses</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3">

                    <div className="ibox-content service-zone-card">
                        <h5 className="text-center">Learners</h5>
                        <div className="row p-0 m-0">
                            <div className="col-5">
                                <span className="lm-icon-wrapper">
                                    <img id="imgServiceZone" src="/students.png" className="lm-icon-size" />
                                </span>
                            </div>
                            <div className="col-7 text-end pt-2">
                                <h1>2000</h1>
                                <h4>Total Learners</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3">

                    <div className="ibox-content employee-card">
                        <h5 className="text-center">Locations</h5>
                        <div className="row p-0 m-0">
                            <div className="col-5">
                                <span className="lm-icon-wrapper">
                                    <img id="imgEmployee" src="/location.png" className="lm-icon-size" />
                                </span>
                            </div>
                            <div className="col-7 text-end pt-2">
                                <h1>126</h1>
                                <h4>Total Locations</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3">

                    <div className="ibox-content revenue-card">
                        <h5 className="text-center">Revenue</h5>
                        <div className="row p-0 m-0">
                            <div className="col-5">
                                <span className="lm-icon-wrapper">
                                    <img id="imgRevenue" src="/revenue.png" className="lm-icon-size" />
                                </span>
                            </div>
                            <div className="col-7 text-end pt-2">
                                <h1>{currencyFormat(9000)}</h1>
                                <h4>Total Revenue</h4>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <Row className="mt-2">
                {courses.map((item, index) =>
                    <Col lg="3" key={index} className="mt-3">
                        <CourseCard key={index} item={item} />
                    </Col>
                )}


            </Row>
        </>
    );
}
export default Dashboard;