import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import SignUp from './Pages/SignUpPage';
import Login from './Pages/LoginPage';

import Landing from './Pages/LandingPage/LandingPage'


import './Styles/SignUpPage.css'; 
import './Styles/Registration.css'
import OlympiadRegistration from './Pages/Registration';
import Dashboard from './Pages/Dashboard';
import CreateTeam from './Pages/CreateTeam';
import SportDetails from './Pages/SportDetails';
import Details from './Pages/UserDetails';
import RegEdit from './Pages/RegEdit';
import Payments from './Pages/Payments';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path ='/' element={<Landing/>}>
          
        </Route>
        <Route exact path='/registration' element={<OlympiadRegistration/>}>  
        </Route>

        <Route exact path ='/login' element={<Login/>}>
        </Route>

        <Route exact path ='/signup' element={<SignUp/>}>
        </Route>

        <Route exact path ='/dashboard' element={<Dashboard />}>
        </Route>
  
          <Route exact path ='/createteam' element={<CreateTeam />}>
          </Route>

          <Route exact path ='/SportDetails' element={<SportDetails />}>
          </Route>

          <Route exact path ='/details' element={<Details />}>
          </Route>

          <Route exact path ='/RegEdit' element={<RegEdit />}>
          </Route>

          <Route exact path ='/Payments' element={<Payments />}>
          </Route>

        </Routes>
    </div>

    </Router>
    
  );
};

export default App;
