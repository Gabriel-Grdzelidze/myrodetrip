import { Bus, Utensils, MapPinned ,Calendar,Shield,Headphones } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Bus,
      title: "Trusted Bus Partners",
      description:
        "Choose from verified drivers with detailed profiles, vehicle photos, and safety ratings.",
      iconColor: "bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8]",
      textColor: "text-[#44A194]",
      features: [
        "Driver profiles & reviews",
        "Vehicle gallery",
        "Safety certifications",
        "GPS tracking",
      ],
    },
    {
      id: 2,
      icon: Utensils,
      title: "Food & Catering",
      description:
        "Browse menus from local restaurants and caterers, perfect for student dietary needs.",
      iconColor: "bg-linear-to-br from-[#FF7F11] to-[#F2B50B]",
      textColor: "text-[#FF7F11]",
      features: [
        "Diverse menu options",
        "Dietary accommodations",
        "Bulk order discounts",
        "Fresh & healthy",
      ],
    },
    {
      id: 3,
      icon: MapPinned,
      title: "Route Planning",
      description:
        "Get optimized travel routes with stops, timings, and educational points of interest.",
      iconColor: "bg-linear-to-br from-[#237227] to-[#44A194]",
      textColor: "text-[#237227]",
      features: [
        "Optimized itineraries",
        "Rest stop planning",
        "Time estimates",
        "Local guides",
      ],
    },
  ];

 const companyValues = [
  {
    id: 1,
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book trips weeks in advance"
  },
  {
    id: 2,
    icon: Shield,
    title: "Full Insurance",
    description: "Comprehensive trip coverage"
  },
  {
    id: 3,
    icon: Headphones,
    title: "24/7 Support",
    description: "Help when you need it"
  }
];

  return (
    <div id="Services" className="bg-[#f1f1f1] text-center py-40 ">
      <div>
        <h4 className="text-[#FF7F11] text-center ">
          <span className="bg-[#FF7F11]/2 0 px-5 py-2 rounded-2xl">
            Our Services
          </span>
        </h4>

        <h1 className="text-[50px] font-semibold">
          Everything You Need for a
          <span className="bg-linear-to-br from-[#FF7F11] to-[#F2B50B]  bg-clip-text text-transparent  ">
            Perfect <br /> Trip
          </span>
        </h1>

        <h5 className="text-[#57595B] text-[17px] font-semibold">
          From transportation to meals, we've got every detail covered so you
          can focus on creating <br /> memorable experiences.
        </h5>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col items-start p-8 bg-white rounded-3xl shadow-md border border-gray-100 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-gray-200 transition-transform duration-300 group-hover:scale-110 ${service.iconColor}`}
              >
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {service.title}
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 text-left">
                {service.description}
              </p>

              <ul className="space-y-4 mt-auto pt-6 border-t border-gray-100 w-full">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 font-medium"
                  >
                    <span
                      className={`${service.textColor} text-xl shrink-0 mt-0.5`}
                    >
                      ✓
                    </span>
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-11 px-20 rounded-2xl w-[60%] mx-auto bg-[#F4F0E4] text-left ">
  {companyValues.map((value) => (
    <div 
      key={value.id} 
      className="group flex items-center gap-4"
    >
      <div className="transition-transform duration-300 group-hover:scale-110 bg-[#237227]/30 p-2 rounded-2xl">
        <value.icon className="w-6 h-6 text-[#237227] " /> 
      </div>

      <div className="flex flex-col">
        <h4 className="font-bold text-gray-900 leading-none">
          {value.title}
        </h4>
        <p className="text-gray-500 text-sm mt-1">
          {value.description}
        </p>
      </div>
    </div>
  ))}
</div>
      
    </div>
  );
};

export default Services;
