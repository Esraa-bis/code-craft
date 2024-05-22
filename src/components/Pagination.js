function Paginationn({ noPerPage, total, paginate, currentPage }) {
  const pageNumbers = [];

  // Calculate total pages (handle division by zero)
  const totalPages = Math.ceil(total / noPerPage) || 1;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    // Validate page number to prevent out-of-bounds errors
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {/* Previous button (disabled on first page) */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a className="page-link" onClick={() => handlePageClick(number)}>
              {number}
            </a>
          </li>
        ))}
        {/* Next button (disabled on last page) */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Paginationn;