import { useContext, useEffect, useRef, useState } from "react";
import Products from "../Products";
import RatingStars from "../Products/RatingStars";
import ProductDataContext from "../../context/ProductDataContextProvider";
import { useSearchParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const productCategories = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

const FilteredProducts = () => {
  const { listOfProducts } = useContext(ProductDataContext);

  const categoryInputRef = useRef([]);
  const [isLoading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleApplyCategoryFilterClick = () => {
    const filteredElement = categoryInputRef.current.filter(
      (element) => element?.checked
    );

    const selectedProductCategory = filteredElement.map(
      (element) => element?.id
    );
    if (selectedProductCategory.length === 0 && !searchParams.get("category"))
      return;
    updateSearchParams(
      "category",
      selectedProductCategory.length ? selectedProductCategory : null
    );
  };

  useEffect(() => {
    // When the component mounts, check if there is a selected category in the searchParams
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const categoryFromParams = searchParams.get("category")?.split(",");
    if (categoryFromParams) {
      // Check the corresponding checkbox
      categoryInputRef.current.forEach((input) => {
        input.checked = categoryFromParams?.includes(input.id);
      });
    }
  }, [searchParams]);

  const updateSearchParams = (key, value) => {
    setSearchParams((prevSearchParams) => {
      if (value === null) {
        prevSearchParams.delete(key);
      } else {
        prevSearchParams.set(key, value);
      }
      return prevSearchParams;
    });
  };

  const applyFilters = (products) => {
    const productCategoryFilter = searchParams.get("category")?.split(",");

    if (productCategoryFilter?.length > 0) {
      products = products.filter((product) =>
        productCategoryFilter?.includes(product.category)
      );
    }

    const ratingFilter = searchParams.get("rating");

    if (ratingFilter > 0) {
      products = products.filter((product) => {
        const rating = product.rating.rate;
        let finalRating = Math.floor(rating);
        let diff = Number((rating - finalRating).toFixed(1));
        finalRating = finalRating + (diff > 0.7 ? 1 : 0);
        return finalRating >= ratingFilter;
      });
    }

    return products;
  };

  const clearFilters = () => {
    setSearchParams({});
    categoryInputRef.current.forEach((input) => {
      input.checked = false;
    });
  };

  const applySorting = (products) => {
    const sortProductsBy = searchParams.get("sort");
    switch (sortProductsBy) {
      case "low_to_high": {
        products.sort((productA, productB) => productA.price - productB.price);
        break;
      }
      case "high_to_low": {
        products.sort((productA, productB) => productB.price - productA.price);
        break;
      }
      case "avg_customer_review": {
        products.sort(
          (productA, productB) => productB.rating.rate - productA.rating.rate
        );
        break;
      }
    }
    return products;
  };

  const getFilteredSortedData = () => {
    const filteredData = applyFilters([...listOfProducts]);
    return applySorting(filteredData);
  };

  const filteredProductsData = getFilteredSortedData();

  return (
    <section name="filter-products" className="">
      {/*===================================== sort product section ===================================== */}
      <section
        name="sort"
        className="flex items-center justify-between px-3 p-2 bg-white border-b border-lightText shadow-borderBottomShadow"
      >
        <p className="text-sm font-medium">
          {filteredProductsData.length} results
        </p>
        <div>
          <label htmlFor="sortProductsBy" className="text-sm  font-medium">
            Sort by:{" "}
          </label>
          <select
            name="sort_by"
            id="sortBy"
            className="selectItem text-xs"
            value={searchParams.get("sort") || ""}
            onChange={(e) => updateSearchParams("sort", e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low_to_high">Price: Low to High</option>
            <option value="high_to_low">Price: High to Low</option>
            <option value="avg_customer_review">Avg. Customer Review</option>
          </select>
        </div>
      </section>
      <section className="flex px-4 py-6">
        {/*===================================== filter product section ===================================== */}
        <div className="filters">
          <div className="w-max mb-4">
            <h3 className="font-medium">Category</h3>
            <ul>
              {productCategories.map((category, index) => {
                return (
                  <li key={category} className="flex gap-2">
                    <input
                      type="checkbox"
                      id={category}
                      ref={(element) =>
                        (categoryInputRef.current[index] = element)
                      }
                    />
                    <label htmlFor={category}>{category}</label>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={handleApplyCategoryFilterClick}
              className="amazonButton text-xs py-1"
            >
              Apply
            </button>
          </div>
          <div className="w-max">
            <h3 className="font-medium">Customer Review</h3>
            <ul
              className="text-xs"
              onClick={(e) =>
                updateSearchParams("rating", e.target.getAttribute("data-id"))
              }
            >
              <li className="flex items-center ">
                <RatingStars rating={4} />
                <p
                  data-id="4"
                  className={`defaultLink text-defaultParagraph ${
                    searchParams.get("rating") === "4" && "font-medium text-sm"
                  }`}
                >
                  & Up
                </p>
              </li>

              <li className="flex items-center">
                <RatingStars rating={3} />
                <p
                  data-id="3"
                  className={`defaultLink text-defaultParagraph ${
                    searchParams.get("rating") === "3" && "font-medium text-sm"
                  }`}
                >
                  & Up
                </p>
              </li>
              <li className="flex items-center">
                <RatingStars rating={2} />
                <p
                  data-id="2"
                  className={`defaultLink text-defaultParagraph ${
                    searchParams.get("rating") === "2" && "font-medium text-sm"
                  }`}
                >
                  & Up
                </p>
              </li>

              <li className="flex items-center">
                <RatingStars rating={1} />
                <p
                  data-id="1"
                  className={`defaultLink text-defaultParagraph ${
                    searchParams.get("rating") === "1" && "font-medium text-sm"
                  }`}
                >
                  & Up
                </p>
              </li>
            </ul>
          </div>
          <button
            onClick={clearFilters}
            className="amazonButton text-xs py-1 my-4"
          >
            Clear All
          </button>
        </div>

        {/*===================================== product section ===================================== */}
        <div className="flex pt-5 justify-center w-full">
          {isLoading ? (
            <Oval
              height={60}
              width={60}
              color="#febd69"
              visible={true}
              wrapperClass="justify-center"
              ariaLabel="oval-loading"
              secondaryColor="#febd69"
              strokeWidth={6}
              strokeWidthSecondary={6}
            />
          ) : filteredProductsData.length ? (
            <Products filteredProductsData={filteredProductsData} />
          ) : (
            <p className="text-lg font-medium text-defaultParagraph">
              Product not available
            </p>
          )}
        </div>
      </section>
    </section>
  );
};

export default FilteredProducts;
