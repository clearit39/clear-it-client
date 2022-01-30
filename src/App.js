import React, { createContext, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
	Routes,
	Route,
	BrowserRouter,
	Switch,
	Redirect,
} from 'react-router-dom';
import Navbar from './Components/base/Navbars';
import Home from './views/Home/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Studymaterial from './Components/Studymaterial';
import Studymaterialiit from './Components/Studymaterialiit';
import Studymaterialneet from './Components/Studymaterialneet';
import Testseries from './views/TestSeries/Testseries';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import Profile from './Components/Profile';
import Footer from './Components/base/Footer';
// import ErrorPage from './Components/base/ErrorPage';
import ScrollButton from './Components/ScrollButton';
import AddCourse from "./Admin/Course/AddCourse";
import UpdateCourse from "./Admin/Course/UpdateCourse";
import { initialState,reducer } from './reducer/UseReducer';
import PrivateRoute from "./APIs/auth/PrivateRoutes"
import AdminRoute from "./APIs/auth/AdminRoutes"
import ManageCourse from "./Admin/Course/ManageCourse";
import PaymentGateway from "./views/payment/PaymentGateway";
import TeacherDashboard from "./Admin/TeacherPortal";
export const UserContext = createContext();
const Routing = ()=>{
  return (
    // <BrowserRouter>
    <Routes>
      <Route
        path="/createCourse"
        element={
          <AdminRoute>
            <AddCourse />
          </AdminRoute>
        }
      />
      <Route
        path="/manageCourse"
        element={
          <AdminRoute>
            <ManageCourse />
          </AdminRoute>
        }
      />
      <Route
        path="/teacherDashboard"
        element={
          <AdminRoute>
            <TeacherDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/updateCourse/:courseId"
        element={
          <AdminRoute>
            <UpdateCourse />
          </AdminRoute>
        }
      />
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/studymaterial" element={<Studymaterial />} />
      <Route path="/studymaterial/iit" element={<Studymaterialiit />} />
      <Route path="/studymaterial/neet" element={<Studymaterialneet />} />
      <Route path="/testseries" element={<Testseries />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/payment" element={<PaymentGateway />} />
    </Routes>
    // </BrowserRouter>
  );
};
const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<UserContext.Provider value={{ state, dispatch }}>
				<Navbar />
				<Routing />
				<Footer />
				<ScrollButton />
			</UserContext.Provider>
		</>
	);
};
export default App;
