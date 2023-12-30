const Banner = () => {
    return (
      <div className="flex flex-col-reverse md:flex-row lg:flex-row justify-between items-center gap-8 pt-14">
        <div className="md:w-1/2 space-y-7 px-4">
          <h1 className="text-4xl md:text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights <br /> Of Delectable
            <span className="text-green"> Food</span>
          </h1>
          <p className="text-lg lg:text-xl md:text-xl text-secondary">
            Where Each Plate Weaves a Story of Culinary <br /> Mastery and
            Passionate Craftsmanship
          </p>
          <button className="btn bg-green text-white px-8 py-3 font-semibold rounded-full">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2">
          <img src="/imgaes/Home/banner.png" alt="Banner img" />
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-around -mt-10 gap-4">
            <div className="space-y-1 flex items-center gap-2 bg-white py-2 px-3  rounded-2xl shadow-md w-64">
              <img
                className="rounded-xl"
                src="/imgaes/Home/b-food1.png"
                alt=""
              />
              <div>
                <h5 className="text-md">Spicy noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
            <div className="space-y-1 items-center gap-2 bg-white py-2 px-3  rounded-2xl shadow-md w-64 hidden lg:flex md:flex">
              <img className="rounded-xl" src="/imgaes/Home/b-food1.png" alt="" />
              <div>
                <h5 className="text-md">Spicy noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;