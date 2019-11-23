import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/index';
import { RegisterPage, MainView, Login } from './containers'
import './chat.less';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="free-layout-wrapper">
          <Switch>
            <Redirect from='/' exact to='/login' />
            {/* {renderRoutes(firstRouteConfig)} */}
            <Route path={['/login', '/Login']} exact component={Login} />
            <Route path='/register' exact component={RegisterPage} />
            <Route path='/' component={MainView} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
