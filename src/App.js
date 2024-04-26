import "./App.css";
import "./assets/css/general.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Discussion from "./components/Discussion";
import Navbar from "./components/navbar";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import EmailCode from "./components/EmailCode";
import Footer from "./components/footer";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/profileComponents/Profile";
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
