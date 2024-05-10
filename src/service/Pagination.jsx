import React, { useState } from 'react';

const CustomPagination = ({ pageCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePageCount = 5; // Number of visible pages before using ellipsis

    if (pageCount <= visiblePageCount) {
      // If the total number of pages is less than or equal to visiblePageCount, display all page numbers
      for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(renderPageItem(i));
      }
    } else {
      // Otherwise, display ellipsis and calculate the range of visible pages around the current page
      const leftEllipsis = currentPage > 1 && (
        <li key="left-ellipsis" className="pagination-item ellipsis">...</li>
      );
      const rightEllipsis = currentPage < pageCount - 2 && (
        <li key="right-ellipsis" className="pagination-item ellipsis">...</li>
      );

      let startPage = currentPage - Math.floor(visiblePageCount / 2);
      startPage = Math.max(startPage, 0);
      let endPage = startPage + visiblePageCount - 1;
      if (endPage >= pageCount) {
        startPage -= endPage - (pageCount - 1);
        endPage = pageCount - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageItem(i));
      }

      return [leftEllipsis, ...pageNumbers, rightEllipsis];
    }

    return pageNumbers;
  };

  const renderPageItem = (pageNumber) => (
    <li
      key={pageNumber}
      className={`pagination-item ${pageNumber === currentPage ? 'active' : ''}`}
      onClick={() => handlePageClick(pageNumber)}
    >
      {pageNumber + 1}
    </li>
  );

  const handleNextClick = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="custom-pagination">
      <ul className="pagination">
        <li
          className={`pagination-item ${currentPage === 0 ? 'disabled' : ''}`}
          onClick={handlePrevClick}
        >
          Previous
        </li>
        {renderPageNumbers()}
        <li
          className={`pagination-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}
          onClick={handleNextClick}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;
