import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactsPage from "./pages/Contacts";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ContactsPage} /> 
        <Route exact path="/Contacts" component={ContactsPage} /> 
      </Switch>
    </div>
  </Router>
);

export default App;