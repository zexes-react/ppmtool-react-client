import React from 'react';
import './App.css';

import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";

import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";


function App() {
  return (
      <Provider store={store}>
          <Router>
              <div className="App">
                  <Header />
                  <Route path="/dashboard" exact component={Dashboard}/>
                  <Route path="/addProject" exact component={AddProject}/>
                  <Route path="/updateProject/:id" exact component={UpdateProject}/>
              </div>
          </Router>
      </Provider>
  );
}

export default App;
