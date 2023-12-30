const ServiceCard = ({img, title, des}) => {
    return (
      <div className="w-[270px]  text-center mx-auto bg-white rounded-2xl shadow-lg space-y-4 py-10 px-4">
        <img className="mx-auto" src={img} alt="" />
        <h2 className="text-green text-2xl">{title}</h2>
        <p className="text-[#90BD95] text-lg">{des}</p>
      </div>
    );
};

export default ServiceCard;