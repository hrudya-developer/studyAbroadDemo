import BottomBar from "../components/BottomBar"
import Carousel from "../layout/Carousel"
import Counselling from "../layout/Counselling"
import Destinations from "../layout/Destinations"
import EssentialService from "../layout/EssentialService"
import Footer from "../components/Footer"
import MainSectionOne from "../layout/MainSectionOne"
// import Navbar from "../layout/Navbar"
import ProgramsSection from "../layout/ProgramsSection"
import SASteps from "../layout/SASteps"
import SearchSection from "../layout/SearchSection"
import StudyDestinations from "../layout/StudyDestinations"
import Testimonial from "../layout/Testimonial"
import LanguagePrograms from "../layout/LanguageProgram"
import MobileApp from "../layout/MobileApp"
// import Topbar from "../layout/Topbar"


const Home = () => {
  return (
    <>
    {/* <Topbar /> */}
    {/* <Navbar /> */}



    <Carousel />
      <SearchSection />
      <MainSectionOne />
      <ProgramsSection />
    <Destinations />
    <LanguagePrograms />
    <MobileApp />
    <EssentialService />
    <SASteps /> 
    <Testimonial /> 
   <Counselling />
    <StudyDestinations /> 



    {/* <Footer />
    <BottomBar /> */}
    </>
  )
}

export default Home