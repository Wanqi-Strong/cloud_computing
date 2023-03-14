import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from '@aws-amplify/ui-react';


import AddAssignment from './pages/AddAssignment/AddAssignment'

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddAssignment signOut={signOut} />}></Route>
          </Routes>
        </BrowserRouter>
      )}

    </Authenticator>
  );
}

export default App;
