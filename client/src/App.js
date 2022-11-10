import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './pages/navigation';
import HomePage from './pages/homepage';
import Activities from './pages/activities';
import Participants from './pages/participants';
import Volunteers from './pages/volunteers';
import AgeGroups from './pages/ageGroups';
import Locations from './pages/locations';
import Enrollments from './pages/enrollments';


function App() {

  return (
    <div className="App">
      <Router>
          <Navigation /> 
          <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/activities" element={<Activities/>} />
            <Route path="/participants" element={<Participants/>} />
            <Route path="/volunteers" element={<Volunteers/>} />
            <Route path="/ageGroups" element={<AgeGroups/>} />
            <Route path="/locations" element={<Locations/>} />
            <Route path="/enrollments" element={<Enrollments/>} />
          </Routes>
      </Router>
  </div>
  );
}

export default App;
