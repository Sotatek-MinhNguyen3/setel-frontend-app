import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import DashboardScreen from './screens/Dashboard/Dashboard';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" component={DashboardScreen} />
        </Switch>
    </Router>
  );
}

export default App;
