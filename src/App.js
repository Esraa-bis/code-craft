import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ConfirmationCode from "./components/ConfirmationCode";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import ChangePassword from "./pages/ChangePassword";
import ChangePhoto from "./pages/ChangePhoto";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import CourseVideos from "./pages/CourseVideos";
import Courses from "./pages/Courses";
import Discussion from "./pages/Discussion";
import MyCourses from "./pages/MyCourses";
import MyLearning from "./pages/MyLearning";
import PaymentMethods from "./pages/PaymentMethods";
import Profile from "./pages/Profile";
import TeachOnCodeCraft from "./pages/TeachOnCodeCraft";
import Policy from "./pages/TermsAndConditions";
import UploadCourse from "./pages/UploadCourse";
import ViewCourse from "./pages/ViewCourse";
import DeleteAccount from "./pages/deleteAccount";
import { SessionTokenStorage } from "./services/local-storage";
import { getUser, isUserLoaded, setIsUserLoaded } from "./services/user";

function App() {
  const [signedIn, setSignedIn] = useState(SessionTokenStorage.hasToken());
  const [user, setUser] = useState(() => ({}));
  const [keyword, setKeyword] = useState(() => "");
  const [isAdmin, setIsAdmin] = useState(() => false);

  useEffect(() => {
    setIsAdmin(() => user?.role === "superAdmin");
  }, [user]);

  useEffect(() => {
    if (signedIn && isUserLoaded() === false) {
      // fetch user.
      setIsUserLoaded(true);
      getUser()
        .then((response) => {
          if (response.success !== true) isUserLoaded(false);
          else setUser(response.profile);
        })
        .catch(() => isUserLoaded(false));
    } else if (signedIn !== true && isUserLoaded()) {
      // remove user.
      setIsUserLoaded(false);
      setUser({});
    }
  }, [signedIn]);

  return (
    <div className="App">
      <Navbar
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        user={user}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home signedIn={signedIn} />} />
          <Route
            path="/SignIn"
            element={<SignIn signedIn={signedIn} setSignedIn={setSignedIn} />}
          />
          <Route path="/SignUp" element={<SignUp signedIn={signedIn} />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ConfirmationCode" element={<ConfirmationCode />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route
            path="/Profile"
            element={
              <Profile user={user} setUser={setUser} signedIn={signedIn} />
            }
          />
          <Route
            path="/ChangePassword"
            element={<ChangePassword signedIn={signedIn} user={user} />}
          />
          <Route
            path="/DeleteAccount"
            element={
              <DeleteAccount
                signedIn={signedIn}
                user={user}
                setSignedIn={setSignedIn}
              />
            }
          />
          <Route
            path="/ChangePhoto"
            element={
              <ChangePhoto signedIn={signedIn} user={user} setUser={setUser} />
            }
          />
          <Route
            path="/PaymentMethods"
            element={
              signedIn ? (
                <PaymentMethods signedIn={signedIn} user={user} />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/Cart"
            element={
              signedIn ? (
                <Cart signedIn={signedIn} />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/ContactUs"
            element={
              signedIn ? (
                <ContactUs />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route
            path="/Courses"
            element={
              <Courses
                keyword={keyword}
                setKeyword={setKeyword}
                signedIn={signedIn}
              />
            }
          />
          <Route
            path="/ViewCourse"
            element={
              signedIn ? (
                <ViewCourse user={user} />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/ReviewCourse"
            element={
              signedIn ? (
                <ViewCourse user={user} />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/MyLearning"
            element={
              signedIn ? (
                <MyLearning />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/Discussion"
            element={<Discussion user={user} signedIn={signedIn} />}
          />
          <Route
            path="/CourseVideos"
            element={
              signedIn ? (
                <CourseVideos />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/MyCourses"
            element={
              signedIn ? (
                <MyCourses user={user} />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/editCourseInfo"
            element={
              signedIn ? (
                <TeachOnCodeCraft edit={true} />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/Admin"
            element={
              <Admin
                signedIn={signedIn}
                setSignedIn={setSignedIn}
                user={user}
              />
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              isAdmin ? <AdminDashboard /> : <Home signedIn={signedIn} />
            }
          />
          <Route
            path="/TeachOnCodeCraft"
            element={
              signedIn ? (
                <TeachOnCodeCraft />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/UploadCourse"
            element={
              signedIn ? (
                <UploadCourse />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route
            path="/editCourseVideos"
            element={
              signedIn ? (
                <UploadCourse edit={true} />
              ) : (
                <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
              )
            }
          />
          <Route path="/policy" element={<Policy />} />

          <Route path="/Checkout" element={<Checkout />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
