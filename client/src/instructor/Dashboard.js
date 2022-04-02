import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CourseCard from "../components/CourseCard";
function Dashboard() {
    
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const res = await fetch("/instructor/courses", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!res.status === 200) {
                throw new Error(res.error)
            }
            const data = await res.json();
            console.log(data);
            setCourses([...data]);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getCourses();
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
                                <h1>50</h1>
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
                                <h1>500 $</h1>
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