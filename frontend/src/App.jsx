import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Layout/Header/Header";
import Courses from "./components/courses/Courses";
import CoursePage from "./components/CoursePage/CoursePage";
import Footer from "./components/Layout/Footer/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Contact from "./components/Contact/Contact";
import Request from "./components/Request/Request";
import About from "./components/About/About";
import Subscribe from "./components/Payments/Subscribe";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import PaymentFail from "./components/Payments/PaymentFail";
import NotFound from "./components/Layout/NotFound";
import Profile from "./components/Profile/Profile";
import ChangePassword from "./components/Profile/ChangePassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses";
import Users from "./components/Admin/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from "./redux/actions/userAction.js";
import { ProtectedRoute } from "protected-route-react";

function App() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const dispatch = useDispatch();

  const { isAuthenticated, user, message, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error && error !== "Not Logged In!") {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    // dispatch(loadUser());
  }, [message, error, dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/profile"
            >
              <Login user={isAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/profile"
            >
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createcourse" element={<CreateCourse />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
