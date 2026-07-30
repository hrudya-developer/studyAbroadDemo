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
import UniversityDetails from "./pages/university-details/UniversityDetails";
import CourseDetailsOfUniv from "./pages/CourseDetailsOfUniv";
import CourseListing from "./pages/CourseSearch";
import AllTestimonials from "./pages/all-testimonials/AllTestimonials";
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
// import GermanLP from "./pages/GermanLP";
import ScrollToTop from "./components/ScrollToTop";
import GermanPopularCourses from "./layout/german-programs/GermanPopularCourses";
import SDBFeedback from "./pages/SDBFeedback";
import SDBPrivacyPolicy from "./pages/SDBPrivacyPolicy";
import CanadaMigration from "./pages/CanadaMigration";
import AustraliaMigration from "./pages/AustraliaMigration";
import ContactUs from "./pages/contactPage/ContactUs";
import AcademyCenters from "./pages/Branches/AcademyCenters";
import AboutUs from "./pages/about/AboutUs";
import NotFound from "./pages/NotFound";

// import PartnersLoginPage from "./pages/PartnersLoginPage";




function Layout() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/student");

  return (
    <>
      {!hideLayout && <Topbar />}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination-list" element={<DestinationList />} />
        <Route path="/community-posts" element={<CommunityPosts />} />
        {/* <Route path="/germanLanguage" element={<GermanLP />} /> */}
        <Route path="/german-popular-courses" element={<GermanPopularCourses />} />
        {/* <Route path="/partnersLoginPage" element = {<PartnersLoginPage />} /> */}

{/* protecte route */}
<Route element={<ProtectedRoute />}>
  <Route path="/student" element={<StudentLayout />}>
    <Route index element={<StudentDashboard />} />
    <Route path="profile" element={<StudentProfile />} />
    <Route path="findCourse" element={<StudentFindCourse />} />
    <Route path="studentApplications" element={<SDBApplications />} /> 
     <Route path="studentWishlistItems" element={<SDBWishlistCourses />} /> 
     <Route path="feedback" element={<SDBFeedback />} />
     <Route path="privacyPolicy" element={<SDBPrivacyPolicy />} />
  </Route>
</Route>
{/* protecte route */}


        <Route path="/loginViaOtp" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/createAccount" element={<CreateAccount />} />

        {/* ✅ FIXED: OUTSIDE student */}
        <Route path="/destination/:id" element={<CountryDetails />} />
        <Route path="/blogs" element={<StudyAbroadBlog />} />

     <Route path="/german-programs/:id" element={<GermanPrograms />} />
       <Route path="/all-universities/:countryId?" element={<AllUniversities />}
/>
        <Route path="/university-details/:id" element={<UniversityDetails />} /> 
      
        <Route path="/courseDetailsOfUniv/:id" element={<CourseDetailsOfUniv />} />

        <Route path="/course-search" element={<CourseSearch />} />

         <Route path="/testimonials" element={<AllTestimonials />} />
         <Route path ="/study-popular-courses" element = {<PopularCoursesPublic/>} />
         <Route path="/add-on-services" element = {<AddOnServices />} />
         <Route path="/canada-migration" element = {<CanadaMigration />} />
         <Route path="/australia-migration" element = {<AustraliaMigration />} />
         <Route path="/contact-us" element={<ContactUs />} />
         <Route path="/branches" element={<AcademyCenters />} />
         <Route path="/about-us" element={<AboutUs />} />
         <Route path="*" element={<NotFound />} />




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
    <ScrollToTop />
      {/* <FollowCursor /> */}
      <Layout />
    </BrowserRouter>
  );
}