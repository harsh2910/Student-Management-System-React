import Alert from './component/Alert';
import './App.css';
import { useState } from 'react';
import Navbar from './component/Navbar';
import AddStudent from './component/AddStudent';
import DisplayStudent from './component/DisplayStudent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Cookies from 'universal-cookie';
import Home from './component/Home';
import EditStudent from './component/EditStudent';
 
const cookies = new Cookies();
 

function App() {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    },1500)
  }
  
  var c = []
  if(cookies.get('data')){
    c=cookies.get('data')
  }
  else{
    cookies.set('data', [], { path: '/' });
  }
  const [students, setStudents] = useState(c);
  const newStudent = (student) => {
    let prev = students;
    prev.push(student);
    setStudents(prev);
    cookies.remove('data', { path: '/' });
    cookies.set('data', prev, { path: '/' });
    showAlert('Student added successfully', 'success');
  }
  const deleteStudent = (id) => {
    let check = window.confirm('Are you sure you want to delete this student?');
    if (check === true) {
      let prev = students;
      prev.splice(id, 1);
      setStudents(prev);
      cookies.remove('data', { path: '/' });
      cookies.set('data', prev, { path: '/' });
      showAlert('success', 'Student deleted successfully');
    } else {
      showAlert('Student not deleted', 'warning');
    }
  }
  

  return (
    <>
    <Router>
    <Navbar/>
    <Alert alert={alert} />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/add" element={<AddStudent showAlert={showAlert} newStudent={newStudent}/>}/>
        <Route path="/display" element={<DisplayStudent showAlert={showAlert} deleteStudent={deleteStudent} students={students} />}/>
        <Route path="/edit/:id" element={<EditStudent students={students} showAlert={showAlert} setStudents={setStudents}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
