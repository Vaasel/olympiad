import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import './Styles/SignUpPage.css'; 


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path ='/' element={<SignUpPage/>}>
          
        </Route>
        
        <Route exact path ='/login' element={<LoginPage/>}>
        </Route>
        
        <Route exact path ='/signup' element={<SignUpPage/>}>
      
        </Route>
        </Routes>
    </div>

    </Router>
    
  );
};

export default App;
