import * as React from 'react';
import { getMovieInfo } from '../services/home';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, TrendingNow, SideMovieInfo, ScrollToTop } from '../components/Common/index.js';
import { PacmanLoader, MoonLoader } from 'react-spinners';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { CardSkeleton, FilterSkeleton } from '../components/Skeleton/HomePageSkeleton/index.js';

const MovieInfo = () => {
  const { slug } = useParams();
  const [movieDetails, setMovieDetails] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const movieDetails = await getMovieInfo([{ slug }]);
        setMovieDetails(movieDetails);
        // console.log(movieDetails)
      } catch (error) {
        console.log(`Error in fetchMovieDetail MovieInfo.jsx: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetail();
  }, [slug]);

  const handleWatchMovie = () => {
    navigate(`/xem-phim/${slug}`, { state: { movieDetails } });
  };
  return (
    <div>
      <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
        <ScrollToTop />
        {isLoading ? (
          <div className='min-h-screen w-full'>
            <SkeletonTheme
              baseColor='#202020'
              highlightColor='#444'>
              <FilterSkeleton />
              <div className='mt-3 lg:flex custom-page  shadow-lg gap-3 min-h-screen'>
                <div className='lg:w-3/4'>
                  <div className='w-full md:flex gap-3'>
                    <div className='md:w-2/6'>
                      <CardSkeleton
                        height={350}
                        width={`100%`}
                      />
                    </div>
                    <div className='md:w-3/4'>
                      <Skeleton
                        height={400}
                        width={`100%`}
                      />
                    </div>
                  </div>
                  <div className='mt-2'>
                    <Skeleton
                      height={200}
                      width={`100%`}
                    />
                  </div>
                  <div className='mt-2'>
                    <Skeleton
                      height={100}
                      width={`100%`}
                    />
                  </div>
                  <div className='mt-2'>
                    <Skeleton
                      height={50}
                      width={`25%`}
                    />
                  </div>
                  <div className='grid grid-cols-2 mt-3 gap-2 md:grid-cols-4 md:grid-rows-3 min-h-screen '>
                    {[...Array(8)].map((_, index) => (
                      <div key={index}>
                        <CardSkeleton
                          height={250}
                          width={`100%`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='lg:w-2/6'>
                  <Skeleton
                    className=' h-screen lg:flex'
                    height={2000}
                  />
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
          </div>
        ) : (
          <>
            <Filter />
            <div className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg'>
              <div className='lg:mr-5 mb-5 lg:w-3/4'>
                <SideMovieInfo
                  detail={movieDetails}
                  handleWatchMovie={handleWatchMovie}
                />
              </div>
              <div className='lg:w-2/6 '>
                <TrendingNow />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
``;
