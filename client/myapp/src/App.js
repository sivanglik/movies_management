import './App.css';
import {BrowserRouter as Router ,Routes ,Route, Outlet} from 'react-router-dom'
import Navbar from './Components/Navbar';
import AllMovies from './Components/AllMovies';
import AddMovie from './Components/AddMovie';
import AddUser from './Components/AddUser';
import UserManagement from './Components/UserManagement';
import AllMembers from './Components/AllMembers';
import AddMember from './Components/AddMember';
import EditMovie from './Components/EditMovie';
import Login from './Components/Login';
import Signup from './Components/Signup';
import EditMember from './Components/EditMember'
const NavLayout = () =>{
  return(
    <>
    <Navbar/>
    <Outlet/>
  </>
  )
  
}
function App() {
  return (
    <div className="App">
      
      <Router>  
              <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/main" element={<NavLayout />}>
                      <Route path="movies/*" element={<AllMovies/>}/>
                      <Route path="movies/addmovie" element={<AddMovie/>}/>
                      <Route path="movies/editmovie/:id" element={<EditMovie/>}/>
                      <Route path="UserManagement/*" element={<UserManagement/>}/>
                      <Route path="UserManagement/adduser" element={<AddUser/>}/>
                      <Route path="Subscriptions" element={<AllMembers/>}/>
                      <Route path="Subscriptions/AddMember" element={<AddMember/>}/>
                      <Route path="Subscriptions/:id" element={<EditMember/>}/>
                  </Route>
              </Routes>
          </Router> 
        
    </div>
  );
}

export default App;
