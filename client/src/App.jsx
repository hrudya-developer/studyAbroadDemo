import Home from "./pages/Home"
import 'animate.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";



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
    <Home />
    </>
  )
}

export default App