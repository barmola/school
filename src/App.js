import React from 'react';

import NavBar from "./components/NavBar"
import Login from "./components/Login"
import CreateAccount from "./components/CreateAccount"

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* <Login/> */}
      <CreateAccount/>
    </div>
  );
}

export default App;
