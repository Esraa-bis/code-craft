import { useEffect, useState } from "react";

function TablePagination({ total, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [previousDisabled, setPreviousDisabled] = useState(true);

  const itemsPerPage = 8;

  useEffect(() => {
    setTotalPages(() => {
      const pages = Math.ceil(total / itemsPerPage);
      setNextDisabled(() => pages === currentPage);
      setPreviousDisabled(() => currentPage === 1);
      setPages(() => (pages > 0 ? [...Array(pages)] : []));
      return pages;
    });
  }, [total]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => {
        const nextPage = page + 1;
        setNextDisabled(() => totalPages === nextPage);
        setPreviousDisabled(() => nextPage === 1);
        onPageChange(nextPage);
        return nextPage;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => {
        const prevPage = Math.max(1, page - 1);
        setNextDisabled(() => totalPages === prevPage);
        setPreviousDisabled(() => prevPage === 1);
        onPageChange(prevPage);
        return page - 1;
      });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(() => {
      setNextDisabled(() => totalPages === pageNumber);
      setPreviousDisabled(() => pageNumber === 1);
      onPageChange(pageNumber);
      return pageNumber;
    });
  };

  return (
    <div className="table-pagination text-center">
      <button onClick={handlePreviousPage} disabled={previousDisabled}>
        Previous
      </button>
      {pages.map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={nextDisabled}>
        Next
      </button>
    </div>
  );
}

export default TablePagination;
