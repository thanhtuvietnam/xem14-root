import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSearch, setPageSearch] = useState(1);
  const [keyType, setKeyType] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading

  const handlePageChange = (newPage) => {
    setPageSearch(newPage);
  };






  React.useEffect(() => {
    setPageSearch(1);
  }, [keyType]);

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        totalItems,
        setTotalItems,
        pageSearch,
        handlePageChange,
        keyType,
        setKeyType,
        isLoading, // Thêm isLoading vào context
        setIsLoading, // Thêm setIsLoading vào context
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
