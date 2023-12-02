import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import SignUp from './Pages/SignUpPage';
import Login from './Pages/LoginPage';
import './Styles/SignUpPage.css'; 


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path ='/' element={<h1>Landing page</h1>}>
          
        </Route>
        
        <Route exact path ='/login' element={<Login/>}>
        </Route>
        
        <Route exact path ='/signup' element={<SignUp/>}>
      
        </Route>
        </Routes>
    </div>

    </Router>
    
  );
};

export default App;
