import FeaturedProductsSection from "../FeaturedProductsSection";

import productsCategoryImages from "../../assets/productCategoriesImages/productCategoriesImages";
import Products from "../Products";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Home = () => {
  const userDetails = useSelector((state) => state.signinDetails.userDetails);
  const navigate = useNavigate();
  return (
    <main name="home" className="relative bg-gray-200">
      <FeaturedProductsSection />
      <section
        name="featured-products"
        className="relative -mt-[75px] md:-mt-[130px] mdl:-mt-[160px]  lgl:-mt-[270px] z-[99]"
      >
        <section className="grid md:grid-cols-2  lg:grid-cols-4 px-4 gap-4 z-50 pb-4">
          <div
            key={productsCategoryImages[0].category}
            className="mx-auto p-4 bg-white shadow-2xl"
          >
            <h3 className="text-xl font-medium py-2">
              {productsCategoryImages[0].title}
            </h3>
            <img
              className=""
              src={productsCategoryImages[0].image}
              alt={productsCategoryImages[0].category}
            />
            <p
              className="navigateButtonLinks text-base py-2"
              onClick={() => navigate("/filtered_products")}
            >
              Shop Now
            </p>
          </div>
          <div
            key={productsCategoryImages[1].category}
            className="mx-auto p-4 bg-white shadow-2xl"
          >
            <h3 className="text-xl font-medium py-2">
              {productsCategoryImages[1].title}
            </h3>
            <img
              src={productsCategoryImages[1].image}
              alt={productsCategoryImages[1].category}
            />
            <p
              className="navigateButtonLinks text-base py-2"
              onClick={() => navigate("/filtered_products")}
            >
              Shop Now
            </p>
          </div>
          <div
            key={productsCategoryImages[2].category}
            className="mx-auto p-4 bg-white shadow-2xl"
          >
            <h3 className="text-xl font-medium py-2">
              {productsCategoryImages[2].title}
            </h3>
            <img
              className=""
              src={productsCategoryImages[2].image}
              alt={productsCategoryImages[2].category}
            />
            <p
              className="navigateButtonLinks text-base py-2"
              onClick={() => navigate("/filtered_products")}
            >
              Shop Now
            </p>
          </div>
          {userDetails?.name ? (
            <div
              key={productsCategoryImages[3].category}
              className="mx-auto p-4 bg-white shadow-2xl"
            >
              <h3 className="text-xl font-medium py-2">
                {productsCategoryImages[3].title}
              </h3>
              <img
                className=""
                src={productsCategoryImages[3].image}
                alt={productsCategoryImages[3].category}
              />
              <p
                className="navigateButtonLinks text-base py-2"
                onClick={() => navigate("/filtered_products")}
              >
                Shop Now
              </p>
            </div>
          ) : (
            <div className="bg-white p-4 h-max shadow-2xl">
              <h2 className="text-2xl font-medium text-defaultHeading">
                Sign in for your best experience
              </h2>
              <button
                onClick={() => navigate("/signin")}
                className="amazonButton text-sm font-medium my-4"
              >
                Sign in Securely
              </button>
            </div>
          )}
        </section>
        <Products />
      </section>
    </main>
  );
};

export default Home;
