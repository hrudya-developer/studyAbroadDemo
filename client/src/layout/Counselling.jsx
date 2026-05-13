import {
  Headphones,
  User,
  Mail,
  Phone,
  Globe,
  CalendarDays,
  MapPin,
  GraduationCap,
  Wallet,
  ChevronDown,
  Send,
} from "lucide-react";

import counselling from "../assets/counselling.png";
import ButtonPrimary from "../components/ButtonPrimary";
import aeroplanePath from "../assets/aeroplanePath.png";

const Counselling = () => {
  return (
    <section className="w-full bg-white py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side */}
       <div
  className="relative rounded-[30px] overflow-hidden min-h-[700px] flex flex-col justify-center p-8"
  style={{
    backgroundImage: `url(${counselling})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Optional dark overlay */}
  <div className="absolute inset-0 bg-secondary/80"></div>

  {/* Content */}
  <div className="relative z-10">
    <div className="mb-4 flex items-center gap-2 text-white font-semibold">
      <Headphones className="w-5 h-5 text-primary" />
      <span className="text-primary">Expert Guidance, Every Step</span>
    </div>

       <h1 className="font-ubuntu font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 text-center lg:text-left text-white">
      Your Dream <br />
      University <br />
      <span className="text-primary">Awaits You</span>
    </h1>

    <div className="w-14 h-1 bg-primary rounded-full mt-5 mb-6"></div>

    <p className="text-white/90 text-lg leading-8 max-w-md">
      We guide you at every step of your study abroad journey.
    </p>
  </div>

  {/* Dashed Plane Path */}
<div className="absolute top-10 right-6 hidden lg:block z-10">
<img src={aeroplanePath} />
</div>
</div>

          {/* Right Side Form */}
          <div className="bg-white rounded-[30px] shadow-xl p-6 sm:p-8 lg:p-10">
            
        

            <h2 className="text-xl sm:text-xl font-bold leading-tight text-[#071c4d]">
              Get <span className="text-primary">FREE</span> Counselling Today!
            </h2>

            <div className="w-14 h-1 bg-primary rounded-full mt-5 mb-6"></div>

           

            {/* Form */}
            <form className="space-y-5">
              
              {/* Row 1 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  icon={<User className="w-4 h-4" />}
                  placeholder="Enter first name"
                  label="First name*"
                />

                <InputField
                  icon={<User className="w-4 h-4" />}
                  placeholder="Enter last name"
                  label="Last name*"
                />
              </div>

              {/* Email */}
              <InputField
                icon={<Mail className="w-4 h-4" />}
                placeholder="Enter your email"
                label="Email address*"
              />

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-[#071c4d] mb-2">
                  Mobile number*
                </label>

                <div className="grid grid-cols-[110px_1fr] gap-3">
                  <div className="border rounded-lg px-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                      🇮🇳 +91
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </div>

                  <div className="border rounded-lg px-4 py-2 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your mobile number"
                      className="w-full outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown Rows */}
              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  icon={<Globe className="w-4 h-4" />}
                  label="Your preferred study destination*"
                  option="Select destination"
                />

                <SelectField
                  icon={<CalendarDays className="w-4 h-4" />}
                  label="When would you like to start?*"
                  option="Select start time"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  icon={<MapPin className="w-4 h-4" />}
                  label="Nearest IDP Office*"
                  option="Select office"
                />

                <SelectField
                  icon={<Headphones className="w-4 h-4" />}
                  label="Preferred mode of counselling*"
                  option="Select mode"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  icon={<GraduationCap className="w-4 h-4" />}
                  label="Preferred study level*"
                  option="Select level"
                />

                <SelectField
                  icon={<Wallet className="w-4 h-4" />}
                  label="How would you fund your education?*"
                  option="Select option"
                />
              </div>

            

            
             
                <ButtonPrimary className="text-sm">   Request Free Counselling</ButtonPrimary>
           
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const InputField = ({ icon, placeholder, label }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#071c4d] mb-2">
        {label}
      </label>

      <div className="border rounded-lg px-4 py-2 flex items-center gap-3">
        <span className="text-gray-400">{icon}</span>

        <input
          type="text"
          placeholder={placeholder}
          className="w-full outline-none text-sm"
        />
      </div>
    </div>
  );
};

const SelectField = ({ icon, option, label }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#071c4d] mb-2">
        {label}
      </label>

      <div className="border rounded-lg px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          {icon}
          <span>{option}</span>
        </div>

        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
};

export default Counselling;