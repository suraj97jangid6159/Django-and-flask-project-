import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import UserListPage from './pages/UserListPage';
import UserFormPage from './pages/UserFormPage';
import UserDetailsPage from './pages/UserDetailsPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={UserListPage} />
        <Route exact path="/users/add" component={UserFormPage} />
        <Route exact path="/users/:id/edit" component={UserFormPage} />
        <Route exact path="/users/:id" component={UserDetailsPage} />
      </Router>
    </Provider>
  );
}

export default App;
