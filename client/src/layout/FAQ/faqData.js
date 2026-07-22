import {
  BookOpenText,
  Building2,
  CircleDollarSign,
  GraduationCap,
  Headphones,
  Plane,
  UserRound,
} from "lucide-react";

export const faqItems = [
  {
    icon: GraduationCap,
    iconClass: "bg-primary text-white",
    question:
      "What services does your study abroad platform offer?",
    answer:
      "We provide end-to-end support including university shortlisting, course selection, application assistance, visa guidance, education loan support, pre-departure preparation and post-arrival guidance.",
  },
  {
    icon: Building2,
    iconClass: "bg-violet-600 text-white",
    question:
      "How do I choose the right university and course?",
    answer:
      "Our counsellors evaluate your academic background, interests, budget and career goals to recommend suitable universities and courses.",
  },
  {
    icon: BookOpenText,
    iconClass: "bg-blue-600 text-white",
    question: "Can you help with visa applications?",
    answer:
      "Yes. Our visa assistance includes document preparation, application review, interview guidance and support throughout the submission process.",
  },
  {
    icon: CircleDollarSign,
    iconClass: "bg-orange-500 text-white",
    question: "Do you assist with education loans?",
    answer:
      "We help students understand funding options, prepare the required documents and connect with suitable education-loan providers.",
  },
  {
    icon: Plane,
    iconClass: "bg-emerald-500 text-white",
    question:
      "What happens after I reach my study destination?",
    answer:
      "Our support continues after arrival through accommodation guidance, orientation assistance and help with settling into your new destination.",
  },
  {
    icon: UserRound,
    iconClass: "bg-pink-600 text-white",
    question:
      "How can I connect with an expert counsellor?",
    answer:
      "You can request free counselling, book an appointment or contact our team directly through the website.",
  },
];

export const faqStats = [
  {
    icon: GraduationCap,
    value: "10K+",
    label: "Students Guided",
    iconClass: "from-primary to-pink-500",
  },
  {
    icon: Plane,
    value: "50+",
    label: "Countries",
    iconClass: "from-violet-500 to-violet-700",
  },
  {
    icon: Building2,
    value: "1000+",
    label: "Universities",
    iconClass: "from-sky-400 to-secondary",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Expert Support",
    iconClass: "from-orange-400 to-orange-600",
  },
];