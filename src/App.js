import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/css/general.css";
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
import ContactUs from "./pages/ContactUs";
import CourseVideos from "./pages/CourseVideos";
import Courses from "./pages/Courses";
import Discussion from "./pages/Discussion";
import MyLearning from "./pages/MyLearning";
import PaymentMethods from "./pages/PaymentMethods";
import Profile from "./pages/Profile";
import TeachOnCodeCraft from "./pages/TeachOnCodeCraft";
import UploadCourse from "./pages/UploadCourse";
import ViewCourse from "./pages/ViewCourse";
import DeleteAccount from "./pages/deleteAccount";
import { SessionTokenStorage } from "./services/local-storage";
import { getUser, isUserLoaded, setIsUserLoaded } from "./services/user";

function App() {
  const [signedIn, setSignedIn] = useState(SessionTokenStorage.hasToken());
  const [user, setUser] = useState(() => ({}));

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
      <Navbar signedIn={signedIn} setSignedIn={setSignedIn} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
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
          element={<PaymentMethods signedIn={signedIn} user={user} />}
        />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/ViewCourse" element={<ViewCourse />} />
        <Route path="/MyLearning" element={<MyLearning />} />
        <Route path="/Discussion" element={<Discussion />} />
        <Route path="/CourseVideos" element={<CourseVideos />} />
        <Route
          path="/Admin"
          element={
            <Admin signedIn={signedIn} setSignedIn={setSignedIn} user={user} />
          }
        />
        <Route path="/AdminDashboard" element={user.role==="superAdmin"?<AdminDashboard />:<Home/>} />
        <Route path="/TeachOnCodeCraft" element={<TeachOnCodeCraft />} />
        <Route path="/UploadCourse" element={<UploadCourse />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
