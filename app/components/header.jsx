'use client'
import { TruckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const role = session?.user?.role;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const driverLinks = [
    { label: "Add Offer", href: "/driverOffer" },
    { label: "My Offers", href: "/myOffers" },
    { label: "See Requests", href: "/requests" }
  ];

  const userLinks = [
    { label: "Browse Trips", href: "/trips" },
    { label: "My Bookings", href: "/myBookings" },
  ];

  const links = role === "driver" ? driverLinks : userLinks;

  return (
    <div className="bg-[#f1f1f1] h-20 w-full flex items-center justify-around px-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
        <div className="rounded-xl bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8] p-2">
          <TruckIcon className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-lg">
          SchoolTrip{" "}
          <span className="bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8] bg-clip-text text-transparent">
            .ge
          </span>
        </h3>
      </div>

      <div>
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li><a className="text-[#57595B] text-[17px] font-semibold hover:text-black transition" href="#PopularDestinations">Destinations</a></li>
          <li><a className="text-[#57595B] text-[17px] font-semibold hover:text-black transition" href="#Services">Services</a></li>
          <li><a className="text-[#57595B] text-[17px] font-semibold hover:text-black transition" href="">How It Works</a></li>
          <li><a className="text-[#57595B] text-[17px] font-semibold hover:text-black transition" href="">Contact</a></li>
        </ul>
      </div>

      {session ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#44A194] to-[#0AC4E0] flex items-center justify-center text-white text-xs font-bold">
              {session.user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-gray-700">{session.user?.name}</span>
            <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              {links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  {label}
                </a>
              ))}
              <div className="border-t border-gray-100" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition font-medium"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Button href={"/authentication"} text={"Become a Member"} />
        </div>
      )}
    </div>
  );
};

export default Header;