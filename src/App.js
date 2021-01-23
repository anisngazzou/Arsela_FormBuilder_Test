import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Form from './Components/FormComponents/Form';
import Login from './Components/Login/Login';
import UserView from './Components/UserResponseComponents/UserView';
import Home from "./Components/Home";
import PrivateRoute from "./Components/Utils/PrivateRoute"
function App() {
  return (
    
    <div >
        <Router>
            <Switch>
               
                <PrivateRoute exact path="/" component={Home}/> 
                <Route exact path="/login" component={Login}/>
                <Route exact path="/s/:formId" component={UserView} />
                <PrivateRoute path="/form/:formId" component={Form}/> 
                
            </Switch>
        </Router>
    </div>
  );
}
 

export default App;
