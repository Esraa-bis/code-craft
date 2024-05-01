import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/css/general.css";
import Discussion from "./components/Discussion";
import EmailCode from "./components/EmailCode";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import DeleteAccount from "./pages/deleteAccount";
import ChangePhoto from "./pages/ChangePhoto";
import PaymentMethods from "./pages/PaymentMethods";
import Cart from "./pages/Cart";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Courses from "./pages/Courses";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discussion" element={<Discussion />} />
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
      </Routes>
    

      <Footer />
    </div>
  );
}

export default App;
