import Banner from "../../Components/Banner";
import Categories from "../../Components/Categories";
import Service from "../../Components/Service";
import Specialty from "../../Components/Specialty";
import Testimonial from "../../Components/Testimonial";

const Home = () => {
    return (
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="section-container">
        <Banner />
        <Categories/>
        <Specialty/>
        <Testimonial/>
        <Service/>
        </div>
      </div>
    );
};

export default Home;