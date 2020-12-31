import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router'
import Main from "./components/Main/main";
import NewItem from "./components/NewItem";

 const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" component={Main} exact />
            <Route path="/create" component={NewItem} exact />
        </Switch>
      </Router>
  );
}

export default App;
