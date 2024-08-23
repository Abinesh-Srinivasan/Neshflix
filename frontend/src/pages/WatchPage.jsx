import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../../utils/constant";
import { formatReleaseDate } from "../../utils/dateFunction";
import { Link } from "react-router-dom";
import axios from "axios";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);

  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  // Fetch trailers
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.Trailers);
      } catch (error) {
        console.error("Error fetching trailers:", error.message);
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [id, contentType]);

  // Fetch similar content
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.Similar);
      } catch (error) {
        console.error("Error fetching similar content:", error.message);
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [id, contentType]);

  // Fetch content details
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        console.log("API response for content:", res.data); // Log the API response
        if (res.data.Content) {
          setContent(res.data.Content);
        } else {
          setContent(null); // Explicitly set to null if content not found
        }
      } catch (error) {
        console.error("Error fetching content details:", error.message);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [id, contentType]);

  // Check if loading is true
  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  // Check if content is null
  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto 2xl:max-w-screen-2xl 4k:max-w-screen-4k">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40 4k:mt-96">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance 4k:text-9xl">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  // Rendering actual content
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4 2xl:mt-16">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
              } 4k:size-32 `}
              disabled={currentTrailerIdx === 0}
              onClick={() => setCurrentTrailerIdx((prev) => prev - 1)}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? " opacity-50 cursor-not-allowed"
                  : ""
              } 4k:size-32 `}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={() => setCurrentTrailerIdx((prev) => prev + 1)}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* video */}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 ? (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto rounded-lg overflow-hidden"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          ) : (
            <h2 className="text-xl text-center mt-5 2xl:mt-40 2xl:text-4xl 4k:mt-96 4k:text-7xl">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content.name}
              </span>{" "}
              😭
            </h2>
          )}
        </div>

        {/* movie details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
          max-w-6xl mx-auto 4k:max-w-screen-4k 4k:gap-56 4k:px-64 "
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance 2xl:text-7xl 4k:text-9xl">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg 2xl:mt-4 2xl:text-3xl 4k:mt-8 4k:text-6xl">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg 2xl:mt-8 2xl:text-3xl 4k:mt-16 4k:text-7xl 4k:leading-snug">
              {content?.overview}
            </p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md 2xl:rounded-2xl 4k:max-h-[1400px]"
          />
        </div>

        {/* similar content section */}
        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative 2xl:mt-24 2xl:max-w-6xl 4k:max-w-screen-4k 4k:px-64 4k:mt-96">
            <h3 className="text-3xl font-bold mb-4 2xl:text-5xl 2xl:mb-10 4k:text-9xl 4k:mb-20">
              Similar Movies/TV Show
            </h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group 2xl:gap-8 2xl:pb-8 4k:pb-40 4k:gap-40"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none 2xl:w-64 4k:w-[16vw]"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md 2xl:rounded-lg 4k:rounded-3xl"
                    />
                    <h4 className="mt-2 text-lg font-semibold 2xl:mt-6 2xl:text-2xl 4k:mt-16 4k:text-7xl">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
                  opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
                  bg-red-600 text-white rounded-full"
                onClick={() =>
                  sliderRef.current.scrollBy({
                    left: sliderRef.current.offsetWidth,
                    behavior: "smooth",
                  })
                }
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
                group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
                text-white rounded-full"
                onClick={() =>
                  sliderRef.current.scrollBy({
                    left: -sliderRef.current.offsetWidth,
                    behavior: "smooth",
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
