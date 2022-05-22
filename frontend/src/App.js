// React App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Toastify
// eslint-disable-next-line no-unused-vars
import { ToastContainer, Flip, Slide, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Nav from './components/Nav';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer draggable={false} transition={Flip} />
    </>
  );
}

export default App;

