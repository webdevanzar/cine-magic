import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "../components/Skeliton";

const MOVIE_URL = import.meta.env.VITE_USER_WITHMOVIE_URL;
const WATCHLATER_URL = import.meta.env.VITE_USER_WATCHLATER_URL;

export const WatchLater = () => {
  const abortController = useRef(new AbortController());
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(4); // Default skeleton count

  const { auth } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();

    return () => {
      abortController.current.abort();
    };
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const userId = auth?._id;
      if (!userId) {
        toast.dismiss();
        toast.error("Not authenticated");
        return;
      }

      const response = await axios(`${MOVIE_URL}/${userId}`, {
        method: "GET",
        signal: abortController.current.signal,
      });
      setMovieList(response.data.movie);
      setSkeletonCount(response.data.movie.length || 4); // Update skeleton count dynamically
      setIsLoading(false);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const deleteMovie = (movieId) => {
    const confirmDelete = async () => {
      try {
        const userId = auth?._id;
        if (!userId) {
          toast.error("Not authenticated");
          return;
        }
        const response = await axios(`${WATCHLATER_URL}/${userId}`, {
          method: "DELETE",
          data: {
            movieId: movieId,
          },
        });
        setMovieList(response.data.movie);
        toast.dismiss();
        toast.success("Movie deleted successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    const cancelDelete = () => {
      toast.dismiss();
    };
    toast.dismiss();
    toast.info(
      <div>
        <p>Are you want to remove this item from watchlater?</p>
        <div className="flex gap-2 justify-center mt-2">
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            OK
          </button>
          <button
            onClick={cancelDelete}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Disable auto-close for this toast
      }
    );
  };

  return (
    <div className="min-h-screen flex justify-start items-center flex-wrap gap-7 md:px-35 md:py-25 px-15 py-25 w-full bg-[#000000d8]">
      {isLoading ? (
        [...Array(skeletonCount)].map((_, index) => <Skeleton key={index} />)
      ) : movieList.length > 0 ? (
        movieList?.map((movie) => (
          <div
            key={movie._id}
            className="w-[320px] h-[440px] md:flex justify-between md:w-[400px] md:h-[280px] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-[#000000d5]"
          >
            <img
              className="w-[100%] h-[50%] object-cover md:w-[40%] md:h-[100%] md:object-cover rounded-lg"
              src={movie.imageUrl}
              alt=""
            />
            <div className="w-[100%] md:w-[65%] p-5">
              <h1 className="text-[20px] text-white md:text-[25px] font-bold  truncate">
                {movie.title}
              </h1>
              <p className="text-[14px] leading-4 mt-2 md:mt-5 text-[gray]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                provident optio eum et at voluptatem ratione
              </p>
              {movie?.genres?.map((genre) => (
                <p
                  key={genre._id}
                  className="inline-block text-[10px] text-[#20afcce9] border-solid border-2 border-[#20afcce9] rounded-lg px-[3px] mr-1"
                >
                  {genre.title}
                </p>
              ))}

              <div className="flex space-x-0 mt-[10px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl ${
                      star <= movie.rating
                        ? "text-yellow-500"
                        : "text-[#cdfa8432]"
                    }`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="flex justify-end md:gap-5 mt-0 md:mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="size-6 cursor-pointer"
                  onClick={() => deleteMovie(movie._id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="flex justify-center items-center md:text-[70px] font-bold text-gray-700 w-full text-[30px]">
          No Items added yet!
        </h1>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
