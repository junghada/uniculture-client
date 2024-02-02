import {Route, Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </>

  );
}

export default App;
