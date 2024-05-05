import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/css/general.css";
import EmailCode from "./components/EmailCode";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import AboutUs from "./pages/AboutUs";
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
import ViewCourse from "./pages/ViewCourse";
import DeleteAccount from "./pages/deleteAccount";
import UploadCourse from "./pages/UploadCourse";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Cart" element={<Cart />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/EmailCode" element={<EmailCode />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/DeleteAccount" element={<DeleteAccount />} />
        <Route path="/ChangePhoto" element={<ChangePhoto />} />
        <Route path="/PaymentMethods" element={<PaymentMethods />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/ViewCourse" element={<ViewCourse />} />
        <Route path="/MyLearning" element={<MyLearning />} />
        <Route path="/Discussion" element={<Discussion />} />
        <Route path="/CourseVideos" element={<CourseVideos />} />
        <Route path="/UploadCourse" element={<UploadCourse />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
