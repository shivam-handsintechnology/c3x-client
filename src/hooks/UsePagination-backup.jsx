import { useEffect, useState } from 'react';

const usePagination = (Data, itemsPerPage) => {
  // //console.log("pagination",Data)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(Data ? Data.length / itemsPerPage : 0);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    Data && settotalPages(Math.ceil(Data.length / itemsPerPage))
    // //console.log(totalPages)
  }, [Data, itemsPerPage])
  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
};

export default usePagination;

