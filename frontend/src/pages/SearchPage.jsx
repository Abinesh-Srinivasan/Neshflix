import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import {ORIGINAL_IMG_BASE_URL} from "../../utils/constant"
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    activeTab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.Content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, Make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occured, please try again later");
      }
    }
  };

  
  return (
    <div className=" bg-black min-h-screen text-white">
      <Navbar />
      <div className=" container mx-auto px-4 py-8 2xl:mt-16 4k:mt-48">
        {/* buttons */}
        <div className=" flex justify-center gap-3 mb-4 2xl:gap-8 2xl:mb-8 2xl:text-2xl 4k:text-6xl 4k:gap-20 4k:mb-24">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 2xl:py-4 2xl:px-8 2xl:rounded-lg 4k:px-16 4k:py-8 4k:rounded-2xl`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 2xl:py-4 2xl:px-8 2xl:rounded-lg 4k:px-16 4k:py-8 4k:rounded-2xl`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 2xl:py-4 2xl:px-8 2xl:rounded-lg 4k:px-16 4k:py-8 4k:rounded-2xl`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>
        {/* search input */}
        <form
          className=" flex gap-2 items-stretch mb-8 max-w-2xl mx-auto 2xl:mb-16 2xl:gap-4 4k:max-w-screen-2xl 4k:gap-12"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className=" w-full p-2 rounded bg-gray-800 text-white 2xl:text-3xl 2xl:p-4 2xl:rounded-lg 4k:text-6xl 4k:p-8 4k:rounded-2xl"
          />
          <button className=" bg-red-600 hover:bg-red-700 rounded p-2 text-white 2xl:p-4 2xl:rounded-lg 4k:p-12 4k:rounded-2xl">
            <Search className=" size-6 2xl:size-8 4k:size-16" />
          </button>
        </form>
        {/* rendering the results */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 4k:p-32 4k:gap-16">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null
            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold 2xl:text-3xl 2xl:mt-4 4k:mt-8 4k:text-6xl">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      setContentType(activeTab);
                    }}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold 2xl:mt-4 2xl:text-3xl 4k:text-6xl 4k:mt-8">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
