import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { MoonLoader } from 'react-spinners';
import { CardSkeleton, FilterSkeleton } from '../HomePageSkeleton';

const SkeletonForAll = () => {
  return (
    <>
      <SkeletonTheme
        baseColor='#202020'
        highlightColor='#444'>
        <div className='relative'>
          <FilterSkeleton />
          <div className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg  min-h-screen mt-3'>
            <div className='lg:mr-5 mb-5 lg:w-3/4'>
              <div>
                <Skeleton
                  height={50}
                  width={100}
                />
              </div>
              <div className='grid grid-cols-2 min-[712px]:grid-cols-3 md:grid-cols-4 gap-2.5'>
                {[...Array(24)].map((_, index) => (
                  <div key={index}>
                    <CardSkeleton
                      height={250}
                      width={`100%`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='lg:w-2/6 '>
              <Skeleton
                className=' h-screen lg:flex'
                height={1500}
              />
            </div>
          </div>
        </div>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
          <MoonLoader
            size={160}
            color='#e06c26'
            className='z-50'
          />
        </div>
      </SkeletonTheme>
    </>
  );
};

export default SkeletonForAll;
