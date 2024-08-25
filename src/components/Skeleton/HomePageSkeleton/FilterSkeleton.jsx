import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FilterSkeleton = ({ width }) => {
  return (
    <div className='custom-page mt-1 h-full'>
      <Skeleton
        className=' px-4 py-3'
        width={width}
      />
    </div>
  );
};

export default FilterSkeleton;
