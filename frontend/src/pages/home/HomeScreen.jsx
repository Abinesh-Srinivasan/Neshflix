import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { ORIGINAL_IMG_BASE_URL } from "../../../utils/constant";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  console.log("Trending:", trendingContent);

  if (!trendingContent) return (
    <div className=" h-screen text-white relative">
      <Navbar />
      <div className=" absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center -z-10 shimmer"/>
  </div>
)

  return (
    <>
      <div className=" relative h-screen text-white">
        <Navbar />
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="hero image"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />
        <div
          className=" absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className=" absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 2xl:px-48 4k:px-96">
          <div className=" bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className=" max-w-2xl 2xl:max-w-4xl 4k:max-w-[50vw]">
            <h1 className=" mt-4 text-6xl font-extrabold text-balance 2xl:text-8xl 4k:text-[11rem]">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg 2xl:text-2xl 2xl:mt-4 4k:mt-10 4k:text-5xl">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date.split("-")[0]}{" "}
              |{trendingContent?.adult ? " 18+" : " PG-13"}
            </p>
            <p className=" mt-4 text-lg 2xl:mt-8 2xl:text-2xl 4k:mt-16 4k:text-6xl 4k:leading-snug">
              {trendingContent?.overview?.length > 200
                ? trendingContent?.overview?.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>
          <div className=" flex mt-8 2xl:mt-12 2xl:gap-4 4k:gap-16">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className=" bg-white hover:bg-white/80 text-black py-2 px-4 font-bold rounded mr-4 flex items-center 2xl:text-3xl 2xl:px-8 2xl:py-3 2xl:rounded-lg 4k:rounded-2xl 4k:text-7xl 4k:py-6 4k:px-16"
            >
              <Play className=" size-6 mr-2 fill-black 2xl:size-8 4k:size-16 4k:mr-4" />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className=" bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center 2xl:text-3xl 2xl:px-8 2xl:py-3 2xl:rounded-lg 4k:rounded-2xl 4k:text-7xl 4k:py-8 4k:px-16"
            >
              <Info className=" size-6 mr-2 2xl:size-8 4k:size-16 4k:mr-4 " />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
