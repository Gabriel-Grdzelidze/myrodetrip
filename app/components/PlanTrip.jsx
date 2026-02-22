'use client'

import { ClipboardList, Bus, UtensilsCrossed, PartyPopper } from 'lucide-react';

const PlanTrip = () => {
  const steps = [
    {
      id: "01",
      title: "Fill Registration Form",
      description: "Enter trip details: number of students, parents, teachers, and special requirements.",
      icon: ClipboardList,
      iconColor: "bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8]",
    },
    {
      id: "02",
      title: "Choose Your Bus",
      description: "Browse verified drivers, view bus photos, check ratings, and select the best fit.",
      icon: Bus,
      iconColor:"bg-[#0AC4E0]"
    },
    {
      id: "03",
      title: "Select Food Menu",
      description: "Pick from diverse catering options that accommodate all dietary needs.",
      icon: UtensilsCrossed,
      iconColor: "bg-linear-to-br from-[#FF7F11] to-[#F2B50B]",
    },
    {
      id: "04",
      title: "Enjoy the Trip!",
      description: "Relax and create unforgettable memories while we handle the logistics.",
      icon: PartyPopper,
      iconColor: "bg-linear-to-br from-[#237227] to-[#44A194]",
    }
  ];

  return (
    <section id="PlanTrip" className="mx-auto px-6 py-20 scroll-mt-24 bg-[#EEEEEE]">
      <div className="text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-widest text-[#48A111] bg-[#48A111]/20 p-2 rounded-2xl">
          Simple Process
        </span>
        <h2 className="text-5xl font-bold text-gray-900 mt-2 mb-4"> 
          Plan Your Trip in <span className='bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8] bg-clip-text text-transparent  '>4 Easy Steps</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto text-left md:text-center">
          Our streamlined process makes organizing school trips effortless. From registration to departure, we've simplified everything.
        </p>
      </div>

     <div className="flex items-center justify-around gap-6 w-[90%] max-w-7xl mx-auto flex-wrap">
  {steps.map((step) => (
    <div 
      key={step.id} 
      className="w-75 h-60 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:scale-105"
    >
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="text-6xl font-black text-gray-100 group-hover:text-gray-200 transition-colors tabular-nums">
          {step.id} 
        </div>
        <div>
          <step.icon className={`w-10 h-10 text-white transition-transform duration-300 group-hover:scale-110 p-2 rounded-[10px] ${step.iconColor}`} />
        </div>
      </div>
      
      <div className="flex flex-col items-start w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {step.title}
        </h3>
        <p className="text-gray-500 leading-relaxed text-sm text-left">
          {step.description}
        </p>
      </div>
    </div>
  ))}
</div>

      
    </section>
  );
}

export default PlanTrip;