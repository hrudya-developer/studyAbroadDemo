import Home from "./pages/Home";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import FollowCursor from "./layout/FollowCursor";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import DestinationList from "./pages/DestinationList";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import BottomBar from "./components/BottomBar";

import MaltaDestination from "./layout/MaltaDestination";
import AlbaniaDestination from "./layout/AlbaniaDestination";
import OtpVerification from "./pages/OtpVerification";
import CreateAccount from "./pages/createAccount";
import LoginPage from "./pages/LoginPage";

import StudentDashboard from "./pages/StudentDashboard";
import StudentLayout from "./pages/StudentLayout";
import StudentProfile from "./pages/studentProfile";

function Layout() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/student");

  return (
    <>
      {!hideLayout && <Topbar />}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinationList" element={<DestinationList />} />
        <Route path="/maltaDestination" element={<MaltaDestination />} />
        <Route path="/albaniaDestination" element={<AlbaniaDestination />} />
        <Route path="/loginViaOtp" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/createAccount" element={<CreateAccount />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
      {!hideLayout && <BottomBar />}
    </>
  );
}

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <FollowCursor />
      <Layout />
    </BrowserRouter>
  );
};

export default App;