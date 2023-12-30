import Titlehook from "../Hook/Titlehook";
import ServiceCard from "./ServiceCard";

const serviceLists = [
  {
    id: 1,
    title: "Catering",
    des: "Delight your guests with our flavors and  presentation",
    img: "/imgaes/Service/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We deliver your order promptly to your door",
    img: "/imgaes/Service/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering ",
    img: "/imgaes/Service/icon3.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    des: "Give the gift of exceptional dining with Foodi Gift Cards",
    img: "/imgaes/Service/icon4.png",
  },
];

const Service = () => {
    return (
      <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-10 md:gap-12 py-16">
        <div className="md:w-1/2 space-y-9">
          <Titlehook
            subTitle={"Our Story & Services"}
            title={"Our Culinary Journey And Services"}
          />
          <p className="text-[#555] text-lg leading-[30px]">
            Rooted in passion, we curate unforgettable dining experiences and
            offer exceptional services, blending culinary artistry with warm
            hospitality.
          </p>
          <button className="bg-green text-white rounded-full px-6 py-2">
            Explore
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {serviceLists.map((item) => (
              <ServiceCard
                key={item.id}
                img={item?.img}
                title={item?.title}
                des={item?.des}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Service;