import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import NoPage from './components/NoPage';
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Instructor from './instructor/Instructor';
import Demo from './components/Demo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="signup" element={<SignUp/>}></Route>
          <Route path="*" element={<NoPage/>}></Route>
        </Route>
        <Route path="/instructor/" element={<Instructor/>}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Home/>}></Route>
          <Route path="students" element={<Home/>}></Route>
          <Route path="profile" element={<Home/>}></Route>
          <Route path="settings" element={<Home/>}></Route>
          <Route path="*" element={<NoPage/>}></Route>
        </Route>
        <Route path="/demo" element={<Demo/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
