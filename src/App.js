import {Route, Redirect, Switch} from 'react-router-dom'

import './App.css'
import './mobile.css'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import Login from './Login'
import Jobs from './Jobs'
import JobItemDetails from './JobItemDetails'
import NotFound from './NotFound'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <div>
    {/* <Header /> */}
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
