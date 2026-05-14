import Home from "./pages/Home"
import 'animate.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import FollowCursor from "./layout/FollowCursor";
// import WhatsAppButton from "./layout/WhatsAppButton";




const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <>
    <FollowCursor />
    {/* <WhatsAppButton /> */}
    <Home />
    </>
  )
}

export default App