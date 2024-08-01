import { useEffect, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import productsCategoryImages from "../../assets/productCategoriesImages/productCategoriesImages";
// import Products from "../Products";
import {
  bannerImg1,
  bannerImg2,
  bannerImg3,
  bannerImg4,
  bannerImg5,
} from "../../assets/images";

const featuredProductsImages = [
  bannerImg1,
  bannerImg2,
  bannerImg3,
  bannerImg4,
  bannerImg5,
];

const FeaturedProductsSection = () => {
  const [slideImagePosition, setSlideImagePosition] = useState(0);

  // const userDetails = useSelector((state) => state.signinDetails.userDetails);
  // const navigate = useNavigate();

  const handlePrevProductClick = () => {
    setSlideImagePosition((prevPosition) =>
      prevPosition === 0
        ? -(featuredProductsImages.length - 1)
        : prevPosition + 1
    );
  };

  const handleNextProductClick = () => {
    setSlideImagePosition((prevPosition) =>
      prevPosition === -(featuredProductsImages.length - 1)
        ? 0
        : prevPosition - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextProductClick();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section name="hero-featured" className="h-max relative">
        <div name="slider-container" className="overflow-hidden">
          <div
            name="slider"
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(${slideImagePosition * 100}%)`,
            }}
          >
            {featuredProductsImages.map((image, index) => (
              <div name="slides" key={index} className="min-w-[100%]">
                <img src={image} alt="featured-product-image" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-[50%] absolute left-0 right-0 top-0 text-white justify-between ">
          <button
            className="md:px-2 flex items-center rounded-[5px] focus:shadow-inlineButtonShadow justify-center cursor-pointer"
            onClick={handlePrevProductClick}
          >
            <NavigateBeforeIcon
              style={{
                fontSize: "3rem",
              }}
            />
          </button>
          <button
            className="md:px-2 flex items-center justify-center rounded-[5px] focus:shadow-inlineButtonShadow cursor-pointer"
            onClick={handleNextProductClick}
          >
            <NavigateNextIcon
              style={{
                fontSize: "3rem",
              }}
            />
          </button>
        </div>
      </section>
    </>
  );
};

export default FeaturedProductsSection;
