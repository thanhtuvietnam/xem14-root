// import * as React from 'react';
// import { Pagination } from '@mui/material';
// import Stack from '@mui/material/Stack';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const PaginationCom = ({ currentPage, setCurrentPage, totalPages, routePath, onPageChange, pageType }) => {
//   const navigate = useNavigate();

//   const handleChangePage = (e, newPage) => {
//     setCurrentPage(newPage)
//     // onPageChange(newPage);
//     navigate(`${routePath}?page=${newPage}`); // Cập nhật URL với trang mới
//   };
//   React.useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage]);

//   return (
//     <>
//       <Stack>
//         <Pagination
//           shape='rounded'
//           count={totalPages}
//           showFirstButton
//           showLastButton
//           color='secondary'
//           page={currentPage}
//           onChange={handleChangePage}
//           sx={{
//             '& .MuiPaginationItem-root': {
//               color: 'white',
//             },
//           }}
//         />
//       </Stack>
//     </>
//   );
// };

// export default PaginationCom;

import * as React from 'react';
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

const PaginationCom = ({ currentPage, setCurrentPage, totalPages, routePath, onPageChange, pageType,  }) => {
  const navigate = useNavigate();
 
  const limit = 24;

  const { pageSearch } = useSearch(); // Lấy pageSearch từ context

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const calculatedTotalPages =
    pageType === 'search'
      ? Math.ceil(totalPages / limit) // Sử dụng totalItemsSearch cho trang tìm kiếm
      : totalPages; // Sử dụng totalPages cho các trang khác

  const handleChangePage = (e, newPage) => {
    if (pageType === 'search') {
      onPageChange(newPage);
    }
    setCurrentPage(newPage); // Luôn cập nhật currentPage
    navigate(`${routePath}?page=${newPage}`);
  };
  


  React.useEffect(() => {
    if (pageType === 'search') {
      setCurrentPage(pageSearch); // Sử dụng pageSearch trực tiếp
    }
  }, [pageType, pageSearch]);



  return (
    <>
      <Stack>
        <Pagination
          shape='rounded'
          // count={totalPages}
          count={calculatedTotalPages}
          showFirstButton
          showLastButton
          color='secondary'
          page={currentPage}
          onChange={handleChangePage}
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
            },
          }}
        />
      </Stack>
    </>
  );
};

export default PaginationCom;
