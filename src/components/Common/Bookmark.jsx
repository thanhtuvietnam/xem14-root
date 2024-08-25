import React, { useRef } from 'react';
import { icons } from '../../shared/icon';

import { Tooltip } from '@mui/joy';

const { FaBookmark } = icons;
const Bookmark = () => {
 
  const bookMarkRef = useRef(0);
  //   console.log(bookMarkRef.current);
  return (
    <>
      <Tooltip
        title='add to favorite'
        size='sm'
        color='success'
        arrow>
        <>
          <FaBookmark
            size={15}
            color='white'
          />
          <span>Phim yêu thích</span>
          <span
            ref={bookMarkRef}
            className='bg-red-600 rounded-full px-[6px] py-[3px] ml-2.5'>
            0
          </span>
        </>
      </Tooltip>
    </>
  );
};

export default Bookmark;
