import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";


import AddAssignment from './pages/AddAssignment/AddAssignment'
import Login from './pages/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path="/login" element={<Login />}></Route> */}
          <Route path="/addAssignment" element={<AddAssignment />}></Route>
          <Route path="/" element={<AddAssignment />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
