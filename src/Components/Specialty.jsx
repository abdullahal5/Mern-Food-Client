import Titlehook from "../Hook/Titlehook";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import Cards from "./Cards";
import {} from 'react-icons/fa6'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const Specialty = () => {
  const [recipes, setRecipes] = useState([]);
  
  const slider = useRef(null);
  
  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      });
  }, []);
  // const simpleNextArrow = (props) =>{
  //   const {className, style, onClick} = props;
  //   return (
  //     <div className={className} style={{...style, display: "block", background: "red"}}  onClick={onClick}>Next</div>
  //   )
  // }
  
  // const siplePrevArrow = (props) =>{
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "green" }}
  //       onClick={onClick}
  //     >
  //       Back
  //     </div>
  //   );
  // }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // nextArrow: <simpleNextArrow></simpleNextArrow>,
    // prevArrow: <siplePrevArrow></siplePrevArrow>
  };
  return (
    <div className="py-16">
      <div className="text-left py-5">
        <Titlehook
          subTitle={"Special Dishes"}
          title={`Standout Dishes From Our Menu`}
        />
      </div>
      <div className="flex items-center justify-end pb-8 gap-3">
        <button
          className="btn p-2 rounded-full"
          onClick={() => slider?.current?.slickPrev()}
        >
          <FaAngleLeft color="green" className="w-8 h-8 p-1" />
        </button>
        <button
          className="btn p-2 rounded-full"
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight color="green" className="w-8 h-8 p-1" />
        </button>
      </div>
      <div>
        <Slider className="overflow-hidden mt-10 space-x-5" ref={slider} {...settings}>
          {recipes.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Specialty;
