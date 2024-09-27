import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from "./Components/SignUp";
import MoreInfo from "./Components/MoreInfo";
import Confirmation from "./Components/Confirmation";
import Success from "./Components/Success";
import Error from "./Components/Error";
import { StateMachineProvider, createStore } from "little-state-machine";

createStore({
  yourDetails: {
    name: "",
    email: "",
    password: "",
    color: "",
    terms: "",
  },
});

const App = () => {
  return (
    <StateMachineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="more-info" element={<MoreInfo />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="success" element={<Success />} />
          <Route path="error" element={<Error />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </StateMachineProvider>
  );
};

export default App;
