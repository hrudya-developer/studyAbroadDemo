import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Select from "react-select";

import {
  Headphones,
  User,
  Mail,
  Globe,
  CalendarDays,
  MapPin,
  GraduationCap,
  Wallet,
} from "lucide-react";

import counselling from "../assets/counselling.png";
import aeroplanePath from "../assets/aeroplanePath.webp";
import { fetchCountries } from "../redux/slices/countrySlice";

const getCountryName = (country) =>
  country?.name ||
  country?.title ||
  country?.destination ||
  country?.country_name ||
  country?.destination_name ||
  country?.country ||
  "";

const normalizeCountries = (data) => {
  if (!Array.isArray(data)) return [];

  return data.flatMap((item) => {
    if (Array.isArray(item)) return normalizeCountries(item);
    if (Array.isArray(item?.countries)) return normalizeCountries(item.countries);
    if (Array.isArray(item?.destinations)) return normalizeCountries(item.destinations);
    if (Array.isArray(item?.data)) return normalizeCountries(item.data);
    return [item];
  });
};

const FreeCounsellingForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const { countries = [], loading: countriesLoading } = useSelector(
    (state) => state.countryData
  );

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    destination: "",
    nearestidp: "",
    studylevel: "",
    modeofcounselling: "",
    starttime: "",
    fund: "",
  });

  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const destinationOptions = normalizeCountries(countries)
    .map((country) => getCountryName(country))
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (mobile.replace(/\D/g, "").length < 7) {
      newErrors.mobile = "Enter a valid mobile number";
    }

    if (!formData.destination) newErrors.destination = "Preferred destination is required";
    if (!formData.starttime) newErrors.starttime = "Start time is required";
    if (!formData.nearestidp) newErrors.nearestidp = "Nearest office is required";
    if (!formData.modeofcounselling) newErrors.modeofcounselling = "Counselling mode is required";
    if (!formData.studylevel) newErrors.studylevel = "Study level is required";
    if (!formData.fund) newErrors.fund = "Funding option is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      destination: "",
      nearestidp: "",
      studylevel: "",
      modeofcounselling: "",
      starttime: "",
      fund: "",
    });

    setMobile("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();

      data.append("api", "overseas@Miak2023");
      data.append("firstname", formData.firstname);
      data.append("lastname", formData.lastname);
      data.append("email", formData.email);
      data.append("mobile", mobile);
      data.append("destination", formData.destination);
      data.append("nearestidp", formData.nearestidp);
      data.append("studylevel", formData.studylevel);
      data.append("modeofcounselling", formData.modeofcounselling);
      data.append("starttime", formData.starttime);
      data.append("fund", formData.fund);
      data.append("ip", "");

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/postEnquiries",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        resetForm();
onSuccess?.();
     Swal.fire({
  icon: "success",
  title: "Submitted Successfully!",
  text: "Your enquiry has been submitted. Our team will contact you soon.",
  confirmButtonText: "OK",
  confirmButtonColor: "#c01f53",
}).then(() => {
  onSuccess?.(); // closes popup
});
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result?.message || "Something went wrong. Please try again.",
          confirmButtonText: "OK",
          confirmButtonColor: "#071c4d",
        });
      }
    } catch (error) {
      console.error("Enquiry submit error:", error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit enquiry. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#071c4d",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
   <section className="bg-white" id="gfc_wrapper">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-1">
          

          <div
            className="rounded-[30px] bg-white p-6 shadow-xl sm:p-8 lg:p-10"
            data-aos="fade-up"
          >
            <h2 className="text-xl font-bold leading-tight text-[#071c4d] sm:text-xl">
              Get <span className="text-primary">FREE</span> Counselling Today!
            </h2>

            <div className="mt-5 mb-6 h-1 w-14 rounded-full bg-primary"></div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
                <InputField
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  icon={<User className="h-4 w-4" />}
                  placeholder="Enter first name"
                  label="First name*"
                  error={errors.firstname}
                />

                <InputField
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  icon={<User className="h-4 w-4" />}
                  placeholder="Enter last name"
                  label="Last name*"
                  error={errors.lastname}
                />
              </div>
 
            <div className="grid gap-4 sm:grid-cols-2">
  <InputField
    name="email"
    type="email"
    value={formData.email}
    onChange={handleChange}
    icon={<Mail className="h-4 w-4" />}
    placeholder="Enter your email"
    label="Email address*"
    error={errors.email}
  />

  <div>
    <label className="mb-2 block text-sm font-semibold text-[#071c4d]">
      Mobile number*
    </label>

    <div
      className={`rounded-lg border ${
        errors.mobile ? "border-red-500" : "border-gray-300"
      }`}
    >
      <PhoneInput
        defaultCountry="in"
        value={mobile}
        onChange={(phone) => {
          setMobile(phone);
          setErrors((prev) => ({ ...prev, mobile: "" }));
        }}
        inputProps={{
          name: "mobile",
          required: true,
        }}
        className="w-full"
        inputClassName="!w-full !border-0 !text-sm !outline-none"
      />
    </div>

    {errors.mobile && (
      <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
    )}
  </div>
</div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ReactSelectField
                  name="destination"
                  value={formData.destination}
                  onChange={handleSelectChange}
                  icon={<Globe className="h-4 w-4" />}
                  label="Your preferred study destination*"
                  options={destinationOptions}
                  loading={countriesLoading}
                  error={errors.destination}
                />

                <ReactSelectField
                  name="starttime"
                  value={formData.starttime}
                  onChange={handleSelectChange}
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="When would you like to start?*"
                  options={[
                    "Immediately",
                    "Within 3 Months",
                    "Within 6 Months",
                    "Next Year",
                  ]}
                  error={errors.starttime}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ReactSelectField
                  name="nearestidp"
                  value={formData.nearestidp}
                  onChange={handleSelectChange}
                  icon={<MapPin className="h-4 w-4" />}
                  label="Nearest Medcity Office*"
                  options={["Kochi", "Calicut", "Kannur", "Trivandrum"]}
                  error={errors.nearestidp}
                />

                <ReactSelectField
                  name="modeofcounselling"
                  value={formData.modeofcounselling}
                  onChange={handleSelectChange}
                  icon={<Headphones className="h-4 w-4" />}
                  label="Preferred mode of counselling*"
                  options={["Online", "Offline", "Phone Call"]}
                  error={errors.modeofcounselling}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ReactSelectField
                  name="studylevel"
                  value={formData.studylevel}
                  onChange={handleSelectChange}
                  icon={<GraduationCap className="h-4 w-4" />}
                  label="Preferred study level*"
                  options={["Bachelor's", "Master's", "Diploma", "PhD"]}
                  error={errors.studylevel}
                />

                <ReactSelectField
                  name="fund"
                  value={formData.fund}
                  onChange={handleSelectChange}
                  icon={<Wallet className="h-4 w-4" />}
                  label="How would you fund your education?*"
                  options={[
                    "Self Funded",
                    "Education Loan",
                    "Scholarship",
                    "Family Support",
                  ]}
                  error={errors.fund}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Request Free Counselling"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const InputField = ({
  icon,
  placeholder,
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#071c4d]">
        {label}
      </label>

      <div
        className={`flex items-center gap-3 rounded-lg border px-4 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span className="text-gray-400">{icon}</span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full text-sm outline-none"
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const ReactSelectField = ({
  icon,
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  loading = false,
}) => {
  const selectOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );

  const selectedValue = value
    ? selectOptions.find((item) => item.value === value) || {
        label: value,
        value,
      }
    : null;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#071c4d]">
        {label}
      </label>

      <div
        className={`flex h-[42px] items-center gap-3 rounded-lg border px-4 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span className="text-gray-400">{icon}</span>

        <div className="min-w-0 flex-1">
          <Select
            name={name}
            value={selectedValue}
            onChange={(selected) => onChange(name, selected?.value || "")}
            options={selectOptions}
            isSearchable
            isDisabled={loading}
            placeholder={loading ? "Loading..." : "Select option"}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "40px",
                height: "40px",
                border: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
              }),
              valueContainer: (base) => ({
                ...base,
                height: "40px",
                padding: 0,
              }),
              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
              }),
              placeholder: (base) => ({
                ...base,
                color: "#6b7280",
                fontSize: "14px",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#6b7280",
                fontSize: "14px",
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: "40px",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                padding: 0,
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "200px",
                overflowY: "auto",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FreeCounsellingForm;