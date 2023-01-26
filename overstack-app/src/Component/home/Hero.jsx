import "./Home.css";
import bannerimg from "./bannerimg.png";

export const Hero = () => {
  return (
    <div className="contianer-fluid">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={bannerimg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
