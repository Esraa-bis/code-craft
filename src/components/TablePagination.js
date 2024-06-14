import { useEffect, useState } from "react";

function TablePagination({ total, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [previousDisabled, setPreviousDisabled] = useState(true);

  const itemsPerPage = 8;

  useEffect(() => {
    setTotalPages(() => {
      const pages = Math.ceil(total / itemsPerPage);
      setNextDisabled(() => pages === currentPage);
      setPreviousDisabled(() => currentPage === 1);
      return pages;
    });
  }, [total]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => {
        onPageChange(page + 1);
        return page + 1;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => {
        onPageChange(page - 1);
        return page - 1;
      });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(() => {
      onPageChange(pageNumber);
      return pageNumber;
    });
  };

  return (
    <div className="table-pagination text-center">
      <button onClick={handlePreviousPage} disabled={previousDisabled}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
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
