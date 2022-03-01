import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Contact from './components/Contact';
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="contact" element={<Contact/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
