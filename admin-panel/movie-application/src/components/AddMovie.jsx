import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const GENRE_URL = import.meta.env.VITE_GENRE_URL;
const MOVIE_URL = import.meta.env.VITE_MOVIE_URL;

export const AddMovie = () => {
  const [file, setFile] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFields, setFormFields] = useState({
    title: "",
    movieImage: "",
    rating: "",
    genres: [],
  });

  const handleFormFields = (key, value) => {
    setFormFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFile = (event) => {
    event.preventDefault();
    setFile(URL.createObjectURL(event.target?.files[0]));
    handleFormFields("movieImage", event.target?.files[0]);
  };

  const handleCheckBox = (event) => {
    let newGenres = [...formFields.genres];

    if (event.target.checked) {
      newGenres.push(event.target.value);
    } else {
      newGenres = newGenres.filter((genre) => genre !== event.target.value);
    }

    handleFormFields("genres", newGenres);
  };

  const handleRating = (event) => {
    handleFormFields("rating", event.target.value);
  };

  const handleTitle = (event) => {
    handleFormFields("title", event.target.value);
  };

  const fetchGenre = async () => {
    const response = await axios(GENRE_URL);
    setGenreList(response.data);
  };
  useEffect(() => {
    fetchGenre();
  }, []);

  //validation

  const validate = () => {
    let errors = {};

    //image validation
    if (!formFields.movieImage) {
      errors.movieImage = "required";
      toast.error("movieImage is required");
    }

    //title validation
    if (!formFields.title.trim()) {
      errors.title = "required";
      toast.error("title is required");
    }

    //rating validation
    if (!formFields.rating) {
      errors.rating = "required";
      toast.error("rating is required");
    }

    //genres validation
    if (formFields.genres.length === 0) {
      errors.genres = "required";
      toast.error("genres is required");
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();

      formData.append("title", formFields.title);
      formData.append("movieImage", formFields.movieImage);
      formData.append("rating", formFields.rating);
      formData.append("genres", formFields.genres);

      try {
        const toastId = toast.loading("Please wait...");
        const response = await axios(MOVIE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        setFormFields({
          title: "",
          rating: "",
          movieImage: "",
          genres: [],
        });
        setFile(null);
        toast.update(toastId, {
          render: "Uploaded successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        setFile(null)
        setFormFields({
          rating:"",
          genres:[]
        })
        toast.dismiss();
        toast.error(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      setFile(null);
      setFormFields({
        title: "",
        rating: "",
        movieImage: "",
        genres: [],
      });
      toast.dismiss();
      toast.error("form has errors", formErrors);
    }
  };

  return (
    <div className="flex justify-center items-center my-12 h-[100vh] py-10">
      <div className="w-2/3 md:w-1/2 bg-slate-900 md:h-auto p-5 rounded-lg">
        <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
          {!file ? (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFile}
                />
              </label>
            </div>
          ) : (
            <div className="flex justify-center items-center bg-white rounded-lg h-56 w-full">
              <img
                src={file}
                alt="image"
                className="object-contain h-full overflow-hidden"
              />
            </div>
          )}

          <div className="mt-2">
            <label htmlFor="" className="font-bold text-white ">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formFields.title}
              className="block outline-none w-full p-1 rounded-lg"
              onChange={handleTitle}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="" className="font-bold text-white">
              Ratings
            </label>
            <input
              type="range"
              name="rating"
              min="1"
              max="5"
              step="1"
              className="w-full appearance-none rounded-lg h-2 cursor-pointer accent-violet-700"
              onChange={handleRating}
              value={formFields.rating}
            />
            <div className="flex justify-between text-white text-xs">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap">
            {genreList &&
              genreList.map((genre) => (
                <div className="flex items-center mr-4" key={genre._id}>
                  <input
                    type="checkbox"
                    name="genres"
                    value={genre._id}
                    className="accent-violet-800"
                    onChange={handleCheckBox}
                    checked={formFields.genres.includes(genre._id)}
                  />
                  <label
                    htmlFor=""
                    className="text-white text-sm ml-2 font-semibold"
                  >
                    {genre.title
                      .charAt(0)
                      .toUpperCase()
                      .concat(genre.title.slice(1))}
                  </label>
                </div>
              ))}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full p-2 bg-violet-800 text-white font-bold rounded-lg mt-10"
          >
            {isSubmitting? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </div>
  );
};
