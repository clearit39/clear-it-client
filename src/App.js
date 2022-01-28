import React,{createContext,useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbars';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Studymaterial from './Components/Studymaterial';
import Studymaterialiit from './Components/Studymaterialiit';
import Studymaterialneet from './Components/Studymaterialneet';
import Testseries from './Components/Testseries';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Footer from './Components/Footer';
import ErrorPage from './Components/ErrorPage';
import ScrollButton from './Components/ScrollButton';
import { initialState,reducer } from './reducer/UseReducer';
export const UserContext = createContext();
const Routing = ()=>{
  return(
    <Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/studymaterial' element={<Studymaterial />} />
    <Route path='/studymaterial/iit' element={<Studymaterialiit />} />
    <Route path='/studymaterial/neet' element={<Studymaterialneet />} />
    <Route path='/testseries' element={<Testseries />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/logout' element={<Logout />} />
    <Route path='*' element={<ErrorPage />} />
  </Routes>
  )
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
     <Routing />
      <Footer />
      <ScrollButton />
    </UserContext.Provider>
    </>
  )
}
export default App;