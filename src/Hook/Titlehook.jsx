const Titlehook = ({title, subTitle}) => {
    return (
      <div>
        <div>
          <h5 className="text-red font-medium tracking-wide uppercase">
            {subTitle}
          </h5>
          <h1 className="text-4xl font-bold text-black py-2">
            {title}
          </h1>
        </div>
      </div>
    );
};

export default Titlehook;