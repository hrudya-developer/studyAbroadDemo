import Home from "./pages/Home";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import FollowCursor from "./layout/FollowCursor";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

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

import OtpVerification from "./pages/OtpVerification";
import CreateAccount from "./pages/createAccount";
import LoginPage from "./pages/LoginPage";

import StudentDashboard from "./pages/StudentDashboard";
import StudentLayout from "./pages/StudentLayout";
import StudentProfile from "./pages/StudentProfile";
import AllUniversities from "./pages/AllUniversities";
import CountryDetails from "./pages/CountryDetails";
import UniversityDetails from "./pages/UniversityDetails";
import CourseDetailsOfUniv from "./pages/CourseDetailsOfUniv";
import CourseListing from "./pages/CourseSearch";
import AllTestimonials from "./layout/AllTestimonials";
import CourseSearch from "./pages/CourseSearch";
import StudyAbroadBlog from "./pages/StudyAbroadBlog";
import GermanPrograms from "./pages/GermanPrograms";
import PopularCoursesPublic from "./pages/PopularCoursesPublic";
import AddOnServices from "./layout/AddOnServices";
import StudentFindCourse from "./pages/SDBFindCourse";
import SDBApplications from "./pages/SDBApplications";
import SDBWishlistButton from "./pages/SDBWishlistButton";
import SDBWishlistCourses from "./pages/SDBWishlistItems";
import CommunityPosts from "./pages/CommunityPosts";




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
        <Route path="/communityPosts" element={<CommunityPosts />} />

{/* protecte route */}
<Route element={<ProtectedRoute />}>
  <Route path="/student" element={<StudentLayout />}>
    <Route index element={<StudentDashboard />} />
    <Route path="profile" element={<StudentProfile />} />
    <Route path="findCourse" element={<StudentFindCourse />} />
    <Route path="studentApplications" element={<SDBApplications />} /> 
     <Route path="studentWishlistItems" element={<SDBWishlistCourses />} /> 
  </Route>
</Route>
{/* protecte route */}


        <Route path="/loginViaOtp" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/createAccount" element={<CreateAccount />} />

        {/* ✅ FIXED: OUTSIDE student */}
        <Route path="/destination/:id" element={<CountryDetails />} />
        <Route path="/studyAbroadBlog" element={<StudyAbroadBlog />} />

     <Route path="/germanPrograms/:id" element={<GermanPrograms />} />

      



      <Route
  path="/allUniversities/:countryId?"
  element={<AllUniversities />}
/>
        <Route path="/universityDetails/:id" element={<UniversityDetails />} /> 
      
        <Route path="/courseDetailsOfUniv/:id" element={<CourseDetailsOfUniv />} />

        <Route path="/courseSearch" element={<CourseSearch />} />

         <Route path="/testimonials" element={<AllTestimonials />} />
         <Route path ="/popularCoursePublic" element = {<PopularCoursesPublic/>} />
         <Route path="/addOnServices" element = {<AddOnServices />} />




      </Routes>

      {!hideLayout && <Footer />}
      {!hideLayout && <BottomBar />}
    </>
  );
}

export default function App() {
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
}