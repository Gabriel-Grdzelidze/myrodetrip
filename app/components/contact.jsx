'use client'
import { Bus, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2B] text-white py-16 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-linear-to-br from-[#44A194] to-[#0AC4E0] p-2 rounded-lg">
              <Bus size={24} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold italic">
              SchoolTrip<span className="text-[#FF7F11]">.ge</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Georgia's premier platform for organizing safe, educational, and
            memorable school trips. Trusted by hundreds of schools nationwide.
          </p>

          <div className="flex flex-col gap-4 text-gray-400">
            <div className="flex items-center gap-3 hover:text-[#FF7F11] transition-colors cursor-pointer group">
              <Phone size={18} className="group-hover:text-[#FF7F11]" />
              <span>+995 555 123 456</span>
            </div>
            <div className="flex items-center gap-3 hover:text-[#FF7F11] transition-colors cursor-pointer group">
              <Mail size={18} className="group-hover:text-[#FF7F11]" />
              <span>info@schooltrip.ge</span>
            </div>
            <div className="flex items-center gap-3 hover:text-[#FF7F11] transition-colors cursor-pointer group">
              <MapPin size={18} className="group-hover:text-[#FF7F11]" />
              <span>Tbilisi, Georgia</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-8">Company</h4>
          <ul className="flex flex-col gap-4 text-gray-400">
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Our Team</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-8">Services</h4>
          <ul className="flex flex-col gap-4 text-gray-400">
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Bus Booking</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Food Catering</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Route Planning</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Custom Trips</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-8">Destinations</h4>
          <ul className="flex flex-col gap-4 text-gray-400">
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Sataplia</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Gelati Monastery</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Signagi</li>
            <li className="hover:text-[#FF7F11] cursor-pointer transition-colors">Motsameta</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">
          © 2026 SchoolTrip.ge. All rights reserved.
        </p>
        <div className="flex gap-4">
          <div className="bg-gray-800 p-2.5 rounded-lg hover:bg-[#FF7F11] transition-all cursor-pointer group">
            <Facebook size={20} fill="currentColor" className="text-white group-hover:text-white" />
          </div>
          <div className="bg-gray-800 p-2.5 rounded-lg hover:bg-[#FF7F11] transition-all cursor-pointer group">
            <Instagram size={20} className="text-white group-hover:text-white" />
          </div>
          <div className="bg-gray-800 p-2.5 rounded-lg hover:bg-[#FF7F11] transition-all cursor-pointer group">
            <Youtube size={20} fill="currentColor" className="text-white group-hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;