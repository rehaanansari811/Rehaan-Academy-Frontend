import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/layout/header/Header'
import Courses from './components/courses/Courses'
import Footer from './components/layout/footer/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgetPassword from './components/auth/ForgetPassword'
import ResetPassword from './components/auth/ResetPassword'
import Contact from './components/contact/Contact'
import Request from './components/request/Request'
import About from './components/about/About'
import Subscribe from './components/payments/Subscribe'
import NotFound from './components/notFound/NotFound'
import PaymentSuccess from './components/payments/PaymentSuccess'
import PaymentFailure from './components/payments/PaymentFailure'
import CourseDetailsPage from './components/courseDetails/CourseDetailsPage'
import Profile from './components/profile/Profile'
import ChangePassword from './components/profile/ChangePassword'
import UpdateProfile from './components/profile/UpdateProfile'
import Dashboard from './components/admin/dashboard/Dashboard'
import CreateCourse from './components/admin/createCourse/CreateCourse'
import AdminCourses from './components/admin/adminCourses/AdminCourses'
import Users from './components/admin/users/Users'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { getMyProfile } from './redux/actions/userAction'
import { ProtectedRoute } from 'protected-route-react'
import Loader from './components/layout/loader/Loader'

const App = () => {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault(e);
  // })


  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user)

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <Router>
      {
        loading ? (<Loader />) :
          (
            <>
              <Header isAuthenticated={isAuthenticated} user={user} />
              <Routes>

                {/*  UNPROTECTED (COMMON ROUTES) */}
                <Route path='/' element={<Home />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/request' element={<Request />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
                <Route path='/paymentSuccess' element={<PaymentSuccess />} />
                <Route path='/paymentFailure' element={<PaymentFailure />} />
                <Route path='*' element={<NotFound />} />


                {/*  PROTECTED ROUTES */}
                <Route path='/profile' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <Profile user={user} />
                  </ProtectedRoute>
                } />
                <Route path='/register' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <Register />
                  </ProtectedRoute>
                } />
                <Route path='/subscribe' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <Subscribe user={user} />
                  </ProtectedRoute>
                } />
                <Route path='/login' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                    <Login />
                  </ProtectedRoute>
                } />
                <Route path='/changePassword' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <ChangePassword />
                  </ProtectedRoute>
                } />
                <Route path='/updateProfile' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <UpdateProfile user={user} />
                  </ProtectedRoute>
                } />
                <Route path='/forgetpassword' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                    <ForgetPassword />
                  </ProtectedRoute>
                } />
                <Route path="/resetpassword/:token" element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile" >
                    <ResetPassword />
                  </ProtectedRoute>
                } />
                <Route path='/course/:id' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CourseDetailsPage user={user} />
                  </ProtectedRoute>
                } />


                {/* Admin Routes */}
                <Route path='/admin/dashboard' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'} >
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path='/admin/createCourse' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'} >
                    <CreateCourse />
                  </ProtectedRoute>
                } />
                <Route path='/admin/courses' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'} >
                    <AdminCourses />
                  </ProtectedRoute>
                } />
                <Route path='/admin/users' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'} >
                    <Users />
                  </ProtectedRoute>
                } />

              </Routes>
              <Footer />
              <Toaster />
            </>
          )
      }
    </Router>
  )
}

export default App

