import { createContext, useContext, useEffect, useReducer } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import NoPage from './components/NoPage';
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Instructor from './instructor/Instructor';
import Demo from './components/Demo';
import Learner from './learner/Learner';
import Admin from './admin/Admin';
import AddCourse from './instructor/AddCourse';
import LearnersTable from './instructor/LearnersTable';
import InstructorDashboard from './instructor/Dashboard';
import InstructorProfile from './instructor/Profile';
import InstructorCourses from './instructor/MyCourses';
import Lessions from './instructor/Lessions';
import { initialState, reducer } from './reducer/UseReducer';
import LearnerCourse from './learner/Course';
import Course from './components/Course';
import Cart from './components/Cart';

export const UserContext = createContext();

export const AllRoutes=()=> {

  const { state, dispatch } = useContext(UserContext);

    return (
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="*" element={<NoPage />}></Route>
        <Route path="course/:id" element={<Course />}></Route>
      </Route>
      <Route path="/learner/" element={<Learner />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Home />}></Route>
        <Route path="profile" element={<Home />}></Route>
        <Route path="settings" element={<Home />}></Route>
        <Route path="*" element={<NoPage />}></Route>
      </Route>
      <Route path="/learner/course/:id" element={<LearnerCourse />}></Route>


    {/* <Route path="/instructor/" element={(state.isLoggedIn && state.userType === 'INSTRUCTOR')?<Instructor />:<Navigate replace to="/login" />}> */}
    <Route path="/instructor/" element={<Instructor />}>
        
        <Route index element={<InstructorDashboard />} />
        <Route path="mycourses" element={<InstructorCourses />}></Route>
        <Route path="lessons" element={<Lessions />}></Route>
        <Route path="addcourse" element={<AddCourse />}></Route>
        <Route path="learners" element={<LearnersTable />}></Route>
        <Route path="profile" element={<InstructorProfile />}></Route>
        <Route path="settings" element={<Home />}></Route>
        <Route path="*" element={<NoPage />}></Route>
      </Route>
      
      <Route path="/admin/" element={<Admin />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Home />}></Route>
        <Route path="instructors" element={<Home />}></Route>
        <Route path="learners" element={<Home />}></Route>
        <Route path="profile" element={<Home />}></Route>
        <Route path="settings" element={<Home />}></Route>
        <Route path="*" element={<NoPage />}></Route>
      </Route>
      <Route path="/demo" element={<Demo />}></Route>
    </Routes>
    );
}
function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const checkLogin = async () => {
    try {
      const res = await fetch("/checklogin", {
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
      if (data.userType === 'Instructor') {
        dispatch({ type: 'INSTRUCTOR_LOGIN' });
      }

    } catch (error) {
      console.log(error);
      dispatch({ type: 'USER_LOGOUT' })
    }


  }

  useEffect(() => {
    checkLogin();
  }, []);


  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
       <AllRoutes/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
