import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup"
import {BrowserRouter as Router ,Routes ,Route} from "react-router-dom"
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Todo from "./Todo";
import ListTodo from  "./ListTodo"
import FirstMenu from "./FirstMenu";

function App() {
  return(
    <div>
    
      <Router>

      <AuthProvider>
        <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/forgot-password" element={<ForgotPassword/>} />
        <Route exact path="/update-profile" element={<UpdateProfile/>} />
        <Route exact path="/todo" element={<Todo/>} />
        <Route exact path="/list-todo" element={<ListTodo/>} />
        <Route exact path="/first-menu" element={<FirstMenu/>} />
        </Routes>
     
      </AuthProvider>

      </Router>
    
    
  
    </div>

   
  
  
  )
}

export default App;
