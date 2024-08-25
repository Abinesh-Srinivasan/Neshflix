import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../../utils/constant";
import { ChevronRight, ChevronLeft } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const formattedCategoryName =
    category[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movie" : "Tv Shows";
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.Content);
    };
    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className=" bg-black text-white relative px-5 md:px-20 4k:px-28 "
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h1 className=" font-bold text-2xl mb-4 2xl:text-5xl 2xl:mb-8 4k:text-8xl 4k:mb-24">
        {formattedCategoryName} {formattedContentType}
      </h1>
      <div
        className=" flex space-x-4 overflow-x-scroll scrollbar-hide 2xl:space-x-8 4k:space-x-20"
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className=" min-w-[250px] relative group 2xl:min-w-[450px] 4k:min-w-[500px]"
          >
            <div className=" rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Movie image"
                className=" transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className=" text-center mt-2 2xl:text-3xl 2xl:mt-5 4k:mt-10 4k:text-6xl 4k:leading-snug">
              {item.title || item.name}
            </p>
          </Link>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
