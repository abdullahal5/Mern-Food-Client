import { FaStar } from "react-icons/fa";
import Titlehook from "../Hook/Titlehook";

const Testimonial = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-12">
      <div className="md:w-1/2">
        <img src="/imgaes/Testimonial/testimonials.png" alt="" />
      </div>
      <div className="md:w-1/2 space-y-7">
        <Titlehook
          subTitle={"Testimonials"}
          title={"What Our Customers Say About Us"}
        />
        <p className="text-[#555] leading-[30px]">
          “I had the pleasure of dining at Foodi last night, and I'm still
          raving about the experience! The attention to detail in presentation
          and service was impeccable”
        </p>
        <div className="flex">
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            <div className="avatar">
              <div className="w-12">
                <img src="/imgaes/Testimonial/testimonial1.png" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="/imgaes/Testimonial/testimonial2.png" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="/imgaes/Testimonial/testimonial3.png" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold">Customer Feedback</h1>
            <p className="flex gap-2 items-center text-secondary">
              <FaStar color="orange" /> 4.9 (18.6k Reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
