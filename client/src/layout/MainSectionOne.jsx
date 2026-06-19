import { FileUser, GraduationCap, Plane, Search } from "lucide-react"


const MainSectionOne = () => {
  return (
    <>
    <section id="_mainSectionOne" className="max-w-7xl mx-auto bg-white px-3 sm:px-5 md:px-8 py-18" data-aos="fade-up">
        <h1 className="font-nunito font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 text-center text-darkPrimary">Everything You Need, All in <span className="text-primary">One</span> Place</h1>
        <p className="py-2 text-md sm:text-md md:text-lg lg:text-lg xl:text-lg text-center textColor">From shortlisting to visa guidance - we're with you at every step.</p>
<div className="w-12.5 h-1.5 bg-primary rounded-2xl my-3 mx-auto"></div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-4 gap-3 my-15">

    <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="size-8 bg-primary/10 p-5 rounded-full grid place-content-center"><Search className="text-primary"/></div>
        <div className="flex gap-1 flex-col items-center md:items-start">
            <h5 className="font-bold text-md sm:text-md md:text-lg">Find Universities</h5>
            <p className="text-sm">Discover top universities worldwide.</p>
        </div>
    </div>
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="size-8 bg-primary/10 p-5 rounded-full grid place-content-center"><GraduationCap className="text-primary"/></div>
         <div className="flex gap-1 flex-col items-center md:items-start">
            <h5 className="font-bold text-md sm:text-md md:text-lg">Scholarships</h5>
            <p className="text-sm">Find scholarships & financial
assistance.</p>
        </div>
    </div>
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="size-8 bg-primary/10 p-5 rounded-full grid place-content-center"><FileUser className="text-primary"/></div>
       <div className="flex gap-1 flex-col items-center md:items-start">
            <h5 className="font-bold text-md sm:text-md md:text-lg">Visa Guidance</h5>
            <p className="text-sm">Get expert help for 
visa process.</p>
        </div>
    </div>
       <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="size-8 bg-primary/10 p-5 rounded-full grid place-content-center"><Plane className="text-primary"/></div>
        <div className="flex gap-1 flex-col items-center md:items-start">
            <h5 className="font-bold text-md sm:text-md md:text-lg">Pre-Departure</h5>
            <p className="text-sm">Get ready for your 

journey abroad.</p>
        </div>
    </div>

</div>

    </section>
    </>
  )
}

export default MainSectionOne