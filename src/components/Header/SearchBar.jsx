import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  return (
    <form className="flex h-10 flex-grow" onSubmit={(e) => e.preventDefault()}>
      <input
        ref={searchInputRef}
        name="product-search"
        className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
        type="text"
        placeholder="Search Amazon.in"
      />
      <button
        type="submit"
        onClick={() =>
          navigate(
            `filtered_products?category=${searchInputRef.current?.value.toLowerCase()}`
          )
        }
        className=" bg-amazon_yellow flex h-full w-12 items-center justify-center cursor-pointer 
                        rounded rounded-s-none hover:bg-[#f3a847]  text-amazon_blue"
      >
        <SearchIcon style={{ fontSize: "30px", color: "black" }} />
      </button>
    </form>
  );
};

export default SearchBar;
