import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../../utils/constant";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month, day, and year from the Date object
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.Content);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}/`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      console.log(
        "Error in handleDelete: ",
        error.message,
        "Entry id:",
        entry.id
      );
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8 2xl:mt-14 2xl:max-w-screen-2xl 4k:max-w-screen-4k 4k:mx-72 4k:mt-56">
          <h1 className="text-3xl font-bold mb-8 2xl:text-5xl 4k:text-8xl">
            Search History
          </h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl 2xl:text-3xl 4k:text-7xl">
              No search history found
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen 4k:pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 2xl:mt-16 2xl:max-w-screen-2xl 4k:max-w-screen-4k 4k:mx-56 4k:mt-48">
        <h1 className="text-3xl font-bold mb-8 2xl:text-5xl 2xl:mb-12 4k:text-8xl 4k:mb-24">
          Search History
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4 2xl:gap-8 4k:gap-16">
          {searchHistory?.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 p-4 rounded flex items-start 2xl:p-6 2xl:rounded-lg 4k:p-16 4k:rounded-3xl"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History image"
                className="size-16 rounded-full object-cover mr-4 2xl:size-24 2xl:mr-6 4k:size-56"
              />
              <div className="flex flex-col 4k:gap-6">
                <span className="text-white text-lg 2xl:text-xl 4k:text-6xl">
                  {entry.title}
                </span>
                <span className="text-gray-400 text-sm 2xl:text-lg 4k:text-5xl">
                  {formatDate(entry.createdAt)}
                </span>
              </div>

              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto 2xl:text-lg 2xl:px-6 2xl:py-2 4k:text-6xl 4k:py-4 4k:px-12 ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600 2xl:size-8 2xl:ml-8 4k:size-20 4k:ml-16"
                onClick={() => handleDelete(entry)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchHistoryPage;
