import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const GENRE_URL = import.meta.env.VITE_GENRE_URL;

export const AddGenre = () => {
  const [text, setText] = useState("");
  const [genres, setGenres] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingArray, setEditingArray] = useState([]);

  const handleGenre = (event) => {
    const value = event.target.value;
    setText(value);
  };

  const fetchGenre = async () => {
    try {
      const response = await axios.get(GENRE_URL);
      setGenres(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  const addGenre = async () => {
    if (!text) {
      //tosting
      return toast.error("Plese Enter Genre");
    }
    try {
      const toastId = toast.loading("Please wait...");
      const response = await axios(GENRE_URL, {
        method: "POST",
        data: {
          title: text,
        },
      });

      genres.push(response.data);
      setText("");
      setIsEdit(false);
      toast.update(toastId, {
        render: "Added succesfully",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });
    } catch (error) {
      toast.dismiss()
      toast.error(error.response.data.message);
      setText("");
    }
  };

  const deleteGenre = (_id) => {
    const confirmDelete = async () => {
      try {
        const response = await axios(GENRE_URL, {
          method: "DELETE",
          data: {
            _id: _id,
          },
        });
        setGenres(response.data);
        toast.dismiss();
        toast.success("Item deleted successfully");
      } catch (error) {
        toast.error(error.response.data.message);
        setText("");
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

  const handleEdit = (_id) => {
    setIsEdit(true);

    const element = genres.filter((data) => data._id === _id);
    setText(element[0].title);
    setEditingArray(element[0]);
  };

  const onSubmitEdit = async () => {
    if (!text) {
      setIsEdit(false);
      return toast.error("Enter Editing value");
    }

    try {
      const response = await axios(GENRE_URL, {
        method: "PUT",
        data: {
          _id: editingArray._id,
          updatedTitle: text,
        },
      });

      //array manipulation
      const updatedGenre = response.data;
      const updatedGenres = genres.map((genre) => {
        return genre._id === updatedGenre._id ? updatedGenre : genre;
      });
      setGenres(updatedGenres);
    } catch (error) {
      toast.error(error.response.data.message);
      setText("");
    }
    setText("");
    setIsEdit(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-2/3 h-2/3 md:w-1/2 md:h-1/2 bg-slate-900 rounded-lg overflow-auto scrollbar-hide relative">
        <div className="sticky top-0 bg-slate-900">
          <div className="w-full flex justify-between p-4">
            <input
              type="text"
              value={text}
              onChange={handleGenre}
              placeholder="Enter Genre"
              className="mr-2 w-full outline-none focus:outline-violet-800 p-2 rounded-lg h-12 text-gray-900"
            />
            {isEdit ? (
              <button
                className="bg-violet-800 p-2 h-12 rounded-lg font-bold text-white"
                onClick={onSubmitEdit}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-violet-800 p-2 h-12 rounded-lg font-bold text-white"
                onClick={addGenre}
              >
                Submit
              </button>
            )}
          </div>
          <div className="border border-gray-700 border-b-2 mt-7"></div>
        </div>

        <div className="flex justify-center gap-2 flex-wrap p-1">
          {genres &&
            genres?.map((data) => (
              <div
                className="w-28 h-24 md:w-36 md:h-28 border border-violet-800 rounded-xl mt-5 p-1"
                key={data._id}
              >
                <div className="flex justify-center gap-5 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="gray"
                    className="size-6 cursor-pointer"
                    onClick={() => handleEdit(data._id)}
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
                    stroke="gray"
                    className="size-6 cursor-pointer"
                    onClick={() => deleteGenre(data._id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
                <div className="border border-gray-700 border-b-2 mt-2"></div>
                <div className="p-3 flex justify-center items-center">
                  <p className="text-white font-semibold">
                    {capitalizeFirstLetter(data.title)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
