import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router'
import MainContainer from "./components/Main/mainContainer";
import NewItem from "./components/NewItem";

 const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" component={MainContainer} exact />
          <Route path="/create" component={NewItem} />
        </Switch>
      </Router>
  );
}

export default App;
