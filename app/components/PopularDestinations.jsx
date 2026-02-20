import Card from "./Card";

const PopularDestinations = () => {
  const destinations = [
    {
      image: "/images/destination-gelati.jpg",
      name: "Sataflia",
      description:
        "Explore dinosaur footprints, ancient caves, and stunning glass walkways in this natural wonder.",
      tags: ["Nature", "Science", "Adventure"],
      time: "Full Day",
      rating: "4.9",
    },
    {
      image: "/images/destination-motsameta.jpg",
      name: "Gelati Monastery",
      description:
        "UNESCO World Heritage site with breathtaking medieval frescoes and rich Georgian history.",
      tags: ["History", "Culture", "UNESCO"],
      time: "Half Day",
      rating: "4.8",
    },
    {
      image: "/images/destination-sataflia.jpg",
      name: "Signagi",
      description:
        "The 'City of Love' with panoramic Alazani Valley views and charming cobblestone streets.",
      tags: ["Culture", "Wine Region", "Views"],
      time: "Full Day",
      rating: "4.9",
    },
    {
      image: "/images/destination-signagi.jpg",
      name: "Motsameta",
      description:
        "Cliff-edge monastery surrounded by lush forests and the scenic Tskaltsitela River canyon.",
      tags: ["Nature", "History", "Scenic"],
      time: "Half Day",
      rating: "4.7",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-6 py-20   text-center mb-50 bg-[#f1f1f1]">
      <div>
        <h4 className="text-[#0AC4E0] text-center "><span className="bg-[#0AC4E0]/10 px-5 py-2 rounded-2xl">Popular Destinations</span></h4>

        <h1 className="text-[50px] font-semibold">
          Discover Georgia's{" "}
          <span className="bg-linear-to-br from-[#44A194] via-[#0AC4E0] to-[#3BC1A8] bg-clip-text text-transparent  ">
            Hidden <br /> Treasures
          </span>
        </h1>

        <h5 className="text-[#57595B] text-[17px] font-semibold">
          Choose from our curated selection of educational and adventure
          destinations perfect for <br /> unforgettable school trips.
        </h5>
      </div>

      <div className="flex items-center justify-around gap-1 w-[80%] flex-wrap">
        {destinations.map((destination) => {
          return (
            <Card
            key={destination.name}
            className="w-75 "
              image={destination.image}
              name={destination.name}
              description={destination.description}
              tags={destination.tags}
              time={destination.time}
              rating={destination.rating}
            />
          );
        })}
      </div>

      <button className="w-[15%] p-2 border cursor-pointer bg-[#0D1A63] text-[#f1f1f1] font-bold rounded-2xl  mt-10 hover:bg-[#0D1A63]/90 transition duration-300  ">View All Destinations</button>
    </div>
  );
};

export default PopularDestinations;
