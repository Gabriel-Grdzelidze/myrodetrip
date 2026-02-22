import { MapPin, Star, Clock2 } from "lucide-react";

const Card = ({ image, name, description, tags, rating, time }) => {
  return (
    <div className="w-75 hover:scale-105 transition duration-400">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <p className="absolute bottom-3.75 left-2.5 flex bg-[#f1f1f1]/90 px-2 py-0.5 rounded-2xl items-center"><span><Clock2 className="m-1 text-[#0AC4E0]" size={15} /></span>{time}</p>
        <p className="absolute top-3.75 right-2.5 flex bg-[#F2B50B] px-3 rounded-2xl items-center"><span><Star /></span>{rating}</p>
      </div>
      <div className="p-4 bg-white">
        <h1 className="text-[20px] font-semibold flex items-center gap-2 mt-4">
          <span>
            <MapPin className="text-[#0AC4E0] font-medium" size={15} />
          </span>
          {name}
        </h1>
        <p className="text-[14px] text-[#57595B]">{description}</p>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {tags.map((tag) => {
            return <p key={tag} className="bg-[#F4F0E4] p-2 rounded-2xl text-[13px] ">{tag}</p>;
          })}
        </div>

        <button className="w-full p-2 text-[#0D1A63] border border-[#0D1A63] cursor-pointer hover:bg-[#0D1A63] hover:text-[#f1f1f1] rounded-2xl transition m-3 mx-auto ">View Details</button>
      </div>
    </div>
  );
};

export default Card;