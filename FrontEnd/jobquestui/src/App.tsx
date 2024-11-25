import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Error from './components/error'


function App() {
  return (
    <BrowserRouter>
			<Routes>
				{/* <Route path="dashboard" element={<Dashboard />} />
				<Route path="add-new-job" element={<AddNewJob />} />
				<Route path="user-profile" element={<UserProfile />} />
				<Route path="/signup" element={<SignUp />} /> */}
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
