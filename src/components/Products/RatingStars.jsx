/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const RatingStars = ({ rating }) => {
  let filledStarCount = Math.floor(rating);
  let diff = Number((rating - filledStarCount).toFixed(1));
  filledStarCount = filledStarCount + (diff > 0.7 ? 1 : 0);

  let halfStarCount = diff > 0.2 && diff < 0.8 ? 1 : 0;
  let emptyStarCount = 5 - filledStarCount - halfStarCount;

  return (
    <div className=" text-[#e67a00]">
      {[...Array(filledStarCount)].map((_, index) => (
        <StarIcon key={index} />
      ))}
      {halfStarCount ? <StarHalfIcon /> : ""}
      {emptyStarCount > 0
        ? [...Array(emptyStarCount)].map((_, index) => (
            <StarBorderIcon key={index} />
          ))
        : ""}
    </div>
  );
};

export default RatingStars;
