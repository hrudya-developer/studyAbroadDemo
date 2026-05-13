import {
  MapPin,
  GraduationCap,
  School,
} from "lucide-react";

const SearchSection = () => {
  const fields = [
    {
      label: "Select Destination",
      icon: MapPin,
    },
    {
      label: "Select Course",
      icon: GraduationCap,
    },
    {
      label: "Select University",
      icon: School,
    },
  ];

  return (
    <section className="py-0">
      <div className="max-w-7xl mx-auto bg-secondary px-3 sm:px-5 md:px-8">
        
        <div className="py-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center">
            
            {/* Select Fields */}

            {fields.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 w-full"
                >
                  {/* Icon */}

                  <div className="bg-primary size-10 rounded-lg grid place-content-center shrink-0">
                    <Icon className="text-white" size={20} />
                  </div>

                  {/* Select */}

                  <div className="flex-1">
                    <select
                      className="
                        w-full
                        text-sm font-semibold text-white
                        bg-transparent
                        border border-white
                        rounded-lg
                        p-3
                        outline-none
                        cursor-pointer
                      "
                    >
                      <option className="text-black">
                        {item.label}
                      </option>
                    </select>
                  </div>
                </div>
              );
            })}

            {/* Button */}

            <div className="w-full">
              <button
                className="
                  w-full
                  bg-primary
                  text-white
                  text-sm
                  font-semibold
                  py-3 px-5
                  rounded-lg
                  hover:opacity-90
                  transition-all duration-300
                  cursor-pointer
                "
              >
                Search
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SearchSection;