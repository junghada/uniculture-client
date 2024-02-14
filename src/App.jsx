import {Route, Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import './App.css'
import "./styles/font.css";
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/Profile/ProfileEdit';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ProfileDelete from './pages/Profile/ProfileDelete';


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/accounts/edit" element={<ProfileEdit />} />
            <Route path="/accounts/personal-info" element={<ProfileInfo />} />
            <Route path="/accounts/delete" element={<ProfileDelete />} />
          </Routes>
        </BrowserRouter>
      </>

  );
}

export default App;
