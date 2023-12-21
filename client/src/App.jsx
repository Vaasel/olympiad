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
import CricketDescription from './Pages/Description';
import VerificationCode from './Pages/VerificationCode';
import ProtectedRoute from './Components/ProtectedRoute';
import Users from './Pages/RegPortal/Users';
import AddSports from './Pages/RegPortal/AddSports';
import AddComp from './Pages/RegPortal/AddComp';
import Challans from './Pages/RegPortal/Challans';
import SingleUser from './Pages/RegPortal/SingleUser';
import ChallanDetails from './Pages/RegPortal/SingleChallan';


const App = () => {

  const dummyData = {
    title: 'Cricket Team',
    description: 'This is a dummy cricket team description.',
    teamMembers: [
      {
        name: 'Player 1',
        role: 'Batsman',
        profilePicture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        name: 'Player 2',
        role: 'Bowler',
        profilePicture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      // Add more dummy data as needed
    ]}

  return (
    <Router>
      <div>
        <Routes>
        <Route exact path ='/' element={<Landing />}>
          
        </Route>
        <Route exact path='/registration' element={<OlympiadRegistration/>}>  
        </Route>

        <Route exact path ='/login' element={<Login/>}>
        </Route>

        <Route exact path ='/signup' element={<SignUp/>}>
        </Route>

        <Route exact path ='/dashboard' element={<ProtectedRoute Component={Dashboard} />}>
        </Route>
  
          <Route exact path ='/createteam' element={<ProtectedRoute Component={CreateTeam }/>}>
          </Route>

          <Route exact path ='/sportdetails' element={<ProtectedRoute Component={SportDetails }/>}>
          </Route>

          <Route exact path ='/details' element={<Details />}>
          </Route>

          <Route exact path ='/regedit' element={<ProtectedRoute Component={RegEdit }/>}>
          </Route>

          <Route exact path ='/Payments' element={<ProtectedRoute Component={Payments }/>}>
          </Route>
          <Route exact path ='/description' element={<ProtectedRoute Component={() => <CricketDescription data={dummyData} />}/>}>
          </Route>

          <Route exact path ='/verifycode' element={<VerificationCode/>}>
          </Route>

          <Route exact path ='/users' element={<Users />}>
        </Route>
        <Route exact path ='/addsports' element={<AddSports />}>
        </Route>
        <Route exact path ='/addcomp' element={<AddComp />}>
        </Route>
        <Route exact path ='/challans' element={<Challans />}>
        </Route>

        <Route exact path ='/user/:id' element={<SingleUser />}>
        </Route>

        <Route exact path ='/challan/:id' element={<ChallanDetails />}>
        </Route>


        </Routes>
    </div>

    </Router>
    
  );
};

export default App;
