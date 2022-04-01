import AddOrder from './addOrder';
import './App.css';
import './bootstrap.min.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Edit from './edit';
import Delete from './delete';
import Header from './components/Header';
import Register from './Register';
import Login from './Login';
function App() {

  return (
      <Router>
      <Header />
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <div className='actions'>
              <Route path="/add">
                <AddOrder/>
              </Route>
              <Route path='/register'>
                  <Register/>
               </Route>
               <Route path='/login'>
                  <Login/>
               </Route>
            </div>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
