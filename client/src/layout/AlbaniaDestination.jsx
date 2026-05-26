import { Heart } from "lucide-react";
import ButtonPrimary from "../components/ButtonPrimary";
import { destinations } from "../data/destinationData"
import { FaHeart } from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";

const AlbaniaDestination = () => {

    const country = destinations.find((item)=>item.name === "Albania");
    
  return (
    <section className="w-full py-15">
        <div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-8">
  <h1 className="font-ubuntu font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-secondary mb-10">
            Why Study in <span className="text-primary">{country.name}</span>
          </h1>

<div className="grid gap-2 justify-between grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

<div className="pe-12 relative"><img src={country.img} className="rounded-xl w-full h-auto object-cover md:max-lg:h-[400px] md:max-lg:aspect-square"/>
<div className="absolute left-3 bottom-3 p-5 rounded-xl z-10 bg-secondary text-white flex items-center gap-2 shadow-md border-b-2 border-white"><span className="bg-white p-3 rounded-full grid place-content-center"><FaHeart className="text-primary text-lg"/></span>Quality education with <br /> affordable living</div>
</div>

<div className="flex gap-3">
    <div className="grid place-content-center">
    <h3 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold py-3 flex gap-4 items-center"><span className="flex justify-center items-center p-2 rounded-full bg-secondary text-white w-14 h-14"><MdQuestionMark size={32}/></span>Why Albania</h3>
    <p className="text-md md:text-base lg:text-lg">Albania is a fantastic choice for students who wish to study in Europe because of its location along the beautiful Adriatic and Ionian coasts. It is well-known for its historical significance, affordability, and pleasant Mediterranean climate. With historic landmarks, charming architecture, and a lively capital city (Tirana), Albania combines tradition with a modern learning environment, making it a good choice for students starting their higher education journey.</p>
<div className="py-5"><ButtonPrimary>Get Free Counselling</ButtonPrimary></div>
</div>
 
</div>




</div>

        </div>
       
    </section>
  )
}

export default AlbaniaDestination