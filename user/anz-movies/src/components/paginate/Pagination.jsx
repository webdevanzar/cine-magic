import { useEffect } from "react";
import "./Pagination.css";
import ReactPaginate from "react-paginate";

export const Pagination = ({ pageCount, setCurrentPage, fetchMovies }) => {
  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePageClick = (e) => {
    const page = e.selected + 1;
    setCurrentPage(page);
    fetchMovies();
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=" > "
      previousLabel=" < "
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(pageCount)}
      renderOnZeroPageCount={null}
      className="react-paginate md:px-28 xl:px-48 py-5"
    />
  );
};
