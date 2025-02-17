import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { Pagination } from "../components/paginate/Pagination";

const WATCHLATER_URL = import.meta.env.VITE_USER_WATCHLATER_URL;

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const { auth } = useAuth();

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async () => {
    try {
      const response = await axios(import.meta.env.VITE_MOVIES_URL, {
        method: "GET",
        withCredentials: true,
        params: {
          page: currentPage,
          limit: 4,
        },
      });
      console.log(response);
      
      setPageCount(Math.ceil(response.data.pageCount));
      setMovies(response.data.movieList);
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const addToWatchLater = async (movieId) => {
    try {
      const userId = auth?._id;
      if (!userId) {
        toast.dismiss();
        toast.error("Not authenticated");
        return;
      }

      const response = await axios(`${WATCHLATER_URL}/${userId}`, {
        method: "PUT",
        data: {
          movieId: movieId,
        },
      });
      toast.dismiss();
      toast.success("added");
      console.log(response);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  return (
    <div className="bg-[#000000f5] px-24 py-20 w-full min-h-screen">
      <Pagination
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        fetchMovies={fetchMovies}
      />
      <section>
        <div className="flex justify-start gap-12 flex-wrap">
          {movies &&
            movies.map((movie) => {
              return (
                <div
                  key={movie._id}
                  className="relative w-[300px] h-[350px] rounded-xl overflow-hidden group"
                >
                  <img
                    src={movie.imageUrl}
                    alt="John Wick"
                    className="w-full h-full transition duration-300 group-hover:brightness-30 object-cover"
                  />
                  <div>
                    <h1 className="absolute inset-0 flex p-4 items-start justify-start text-white text-[36px] font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {movie.title || movie.name}
                    </h1>
                    <svg
                      onClick={() => addToWatchLater(movie._id)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-9 absolute bottom-4 right-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </div>
  );
};
