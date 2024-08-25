import React, { useEffect, useState } from 'react';
import { MovieCategory, NoteViewer } from '../components/Common';
import { useSearch } from '../context/SearchContext';
import { MoonLoader } from 'react-spinners';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { CardSkeleton, FilterSkeleton } from '../components/Skeleton/HomePageSkeleton';
import { noteLine } from '../shared/constant';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';

const SearchPage = () => {
  const { searchResults, totalItems, keyType, isLoading } = useSearch();

  return (
    <>
      <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
        {isLoading ? (
          <SkeletonForAll />
        ) : (
          <MovieCategory
            sectionTitle={`Kết quả tìm kiếm cho từ khoá: ${keyType}`}
            dataResults={searchResults}
            totalItemsSearch={totalItems}
          />
        )}
      </div>
    </>
  );
};

export default SearchPage;
