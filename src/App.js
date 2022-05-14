import Login from './Login';
import Booking from './Booking'
import Home from './Home'
import {BrowserRouter as Router, Routes, Navigate, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Delete from './Delete';
import Edit from './Edit';
import Sample from './Sample';
import { useContext } from 'react';
import { UserContext } from './context/context';








function App(){
  const {user} = useContext(UserContext)
  return(
    <Router >
      <Routes >
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login/>} />
        {user!=="-1" &&
        <><Route exact path="/booking" element={<Booking/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/delete" element={<Delete/>} />
        <Route exact path="/edit" element={<Edit/>} />
        </>
        }
        <Route exact path="/sample" element={<Sample/>} />
        <Route exact path="*" element={<Navigate to="/login" />} />
      </Routes >
    </Router>
  );
}
export default App