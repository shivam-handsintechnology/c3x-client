import React, { useState } from 'react';

const MyComponent = () => {
  // Sample data
  const items = [...Array(100).keys()];

  // Number of items to display per page
  const itemsPerPage = 10;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the start and end index for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only items for the current page
  const itemsToDisplay = items.slice(startIndex, endIndex);

  return (
    <div>
      <h1>My Custom Paginated Component</h1>
      <ul>
        {itemsToDisplay.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    
    </div>
  );
};

export default MyComponent;
