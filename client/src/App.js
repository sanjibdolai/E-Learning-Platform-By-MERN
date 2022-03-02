import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import NoPage from './components/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact/>}></Route>
          <Route path="*" element={<NoPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
