import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const MOVIE_URL = import.meta.env.VITE_MOVIE_URL;

export const Dashbord = () => {
  const [movieList, setMovieList] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios(`${MOVIE_URL}/admin`);
      setMovieList(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteMovie = (_id) => {
    const confirmDelete = async () => {
      try {
        const response = await axios(MOVIE_URL, {
          method: "DELETE",
          data: {
            _id: _id,
          },
        });
        setMovieList(response.data);
        toast.dismiss();
        toast.success("Movie deleted successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    const cancelDelete = () => {
      toast.dismiss();
    };

    toast.info(
      <div>
        <p>Are you want to delete this item?</p>
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

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="flex justify-start items-center flex-wrap gap-7 md:mx-96 w-2/3 mx-auto md:my-32  my-28 ">
      {movieList &&
        movieList?.map((movie) => (
          <div
            key={movie._id}
            className="w-[320px] h-[480px] md:flex justify-between md:w-[400px] md:h-[280px] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-[#000000d5]"
          >
            <img
              className="w-[100%] h-[50%] object-top md:w-[40%] md:h-[100%] md:object-cover rounded-lg"
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
              <div className="flex justify-end gap-3 md:gap-5 mt-2 md:mt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="size-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
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
        ))}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
