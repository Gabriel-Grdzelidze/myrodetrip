'use client'
import { useState, useEffect } from "react";
import { Users, GraduationCap, UserCheck, MapPin, Utensils, Calendar } from "lucide-react";
import { SuccessMessage, ErrorMessage } from '../components/ui/message'
import { useMutation } from "@apollo/client/react";
import { CREATE_TRIP } from "@/graphql/mutations";
import { useQuery } from "@apollo/client/react";
import { GET_DESTINATIONS, GET_MENUS } from "../../graphql/query";
import GridSkeleton from "../components/ui/GridSkeleton";

const RegistrationPreview = () => {
  const [students, setStudents] = useState(25);
  const [parents, setParents] = useState(5);
  const [teachers, setTeachers] = useState(2);
  const [destination, setDestination] = useState("");
  const [menu, setMenu] = useState("");
  const [status, setStatus] = useState("idle");

  const [destinationArr, setDestinationArr] = useState([])
  const [menuArr, setMenuArr] = useState([])

  const { data, loading: destLoading } = useQuery(GET_DESTINATIONS)
  const { data: menuData, loading: menuLoading } = useQuery(GET_MENUS)

  useEffect(() => {
    if (data?.getDestinations) {
      setDestinationArr(data.getDestinations);
    }
  }, [data]);

  useEffect(() => {
    if (menuData?.getMenus) {
      setMenuArr(menuData.getMenus);
    }
  }, [menuData]);

  const totalPeople = students + parents + teachers;
  const selectedDestination = destinationArr.find(d => d.id === destination);
  const selectedMenu = menuArr.find(m => m.id === menu);

  const transportCost = totalPeople * (selectedDestination?.price || 0);
  const foodCost = totalPeople * (selectedMenu?.price || 0);
  const totalCost = transportCost + foodCost;

  const [addTrip, { loading }] = useMutation(CREATE_TRIP, {
    variables: { TotalParticipants: totalPeople, Destination: destination, Menu: menu, Cost: totalCost },
    onCompleted: () => setStatus("success"),
    onError: () => setStatus("error"),
  });

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 text-[#0992C2] bg-[#0992C2]/30">
            Quick Quote
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Plan Your <span className="bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8] bg-clip-text text-transparent">School Trip</span> Now
          </h2>
          <h6 className="text-[19px] text-[#57595B]">Fill in your trip details and get an instant estimate. Our team will contact you with a detailed proposal.</h6>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side: Trip Details */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Trip Details</h3>

            <div className="space-y-4 mb-8">
              {[
                { label: "Students", val: students, set: setStudents, icon: GraduationCap, color: "bg-teal-50 text-teal-600", min: 1 },
                { label: "Parents", val: parents, set: setParents, icon: Users, color: "bg-orange-50 text-orange-600", min: 0 },
                { label: "Teachers", val: teachers, set: setTeachers, icon: UserCheck, color: "bg-green-50 text-green-600", min: 1 }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => item.set(Math.max(item.min, item.val - 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 font-bold">−</button>
                    <span className="w-8 text-center font-bold text-lg">{item.val}</span>
                    <button onClick={() => item.set(item.val + 1)} className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Destination
              </label>
              {destLoading ? <GridSkeleton count={4} /> : (
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                  {destinationArr.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => setDestination(dest.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${destination === dest.id ? "border-teal-500 bg-teal-50/30" : "border-gray-100 hover:border-teal-200"}`}
                    >
                      <span className="font-bold text-gray-800 block">{dest.name}</span>
                      <span className="text-sm text-gray-500">₾{dest.price}/person</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
                <Utensils className="w-4 h-4" /> Food Menu
              </label>
              {menuLoading ? <GridSkeleton count={4} /> : (
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                  {menuArr.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMenu(m.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${menu === m.id ? "border-orange-400 bg-orange-50/30" : "border-gray-100 hover:border-orange-200"}`}
                    >
                      <span className="font-bold text-gray-800 block">{m.name}</span>
                      <span className="text-sm text-gray-500">₾{m.price}/person</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-[#1a94b8] bg-linear-to-b from-[#1a94b8] to-[#3ab5d8] rounded-3xl p-8 text-white flex flex-col shadow-xl">
            <div className="flex items-center gap-3 mb-10">
              <Calendar className="w-6 h-6" />
              <h3 className="text-2xl font-bold">Trip Summary</h3>
            </div>

            <div className="space-y-6 mb-10 grow">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="opacity-90">Total Participants</span>
                <span className="font-bold text-2xl">{totalPeople}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="opacity-90">Destination</span>
                <span className="font-medium">{selectedDestination?.name || "Not selected"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="opacity-90">Menu Selection</span>
                <span className="font-medium">{selectedMenu?.name || "Not selected"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="opacity-90">Transport Cost</span>
                <span className="font-bold">₾{transportCost}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="opacity-90">Food Cost</span>
                <span className="font-bold">₾{foodCost}</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden border border-white/5">
              <div className="flex justify-between items-center relative z-10">
                <span className="text-lg opacity-90">Estimated Total</span>
                <span className="text-5xl font-bold">₾{totalCost}</span>
              </div>
              <p className="text-[12px] opacity-70 mt-2 relative z-10">*Final price may vary based on specific requirements</p>
            </div>

            <button
              onClick={() => {
                setStatus("idle");
                addTrip();
              }}
              disabled={loading || !destination || !menu}
              className="w-full bg-white text-[#1a94b8] py-5 rounded-2xl font-bold text-lg shadow-lg transition-all hover:bg-gray-50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Trip..." : "Add to Schedule"}
            </button>
          </div>
        </div>

        {status === "success" && <SuccessMessage message="Trip has been added successfully!" />}
        {status === "error" && <ErrorMessage message="Failed to add trip. Please try again." />}

      </div>
    </section>
  );
};

export default RegistrationPreview;