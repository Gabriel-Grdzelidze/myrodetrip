'use client'
import { TruckIcon } from "@heroicons/react/24/outline";
import Button from "./button";

const Header = () => {
  return (
    <div className="bg-[#f1f1f1] h-20 w-full flex items-center justify-around px-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
        <div className="rounded-xl bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8] p-2">
          <TruckIcon className="h-5 w-5" />
        </div>

        <h3 className="font-bold text-lg">
          SchoolTrip{" "}
          <span className="bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8] bg-clip-text text-transparent ">
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
      
      <div>
        <Button href={"/addTrip"} text={"Plan Your Trip"}/>
      </div>
    </div>
  );
};

export default Header;
