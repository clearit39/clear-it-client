import React,{createContext,useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/base/Navbars';
import Home from './views/Home/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Studymaterial from './Components/Studymaterial';
import Studymaterialiit from './Components/Studymaterialiit';
import Studymaterialneet from './Components/Studymaterialneet';
import Testseries from './views/TestSeries/Testseries';
import Login from './views/Auth/Login';
import Logout from './views/Auth/Logout';
import Signup from './views/Auth/Signup';
import Profile from './Components/Profile';
import Footer from "./Components/base/Footer";
import ErrorPage from './Components/base/ErrorPage';
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