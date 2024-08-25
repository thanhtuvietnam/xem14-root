import * as React from 'react';
import BannerSlider from '../components/Slider/BannerSlider';
import SectionSlider from '../components/Slider/SectionSlider';
import { TrendingNow, Filter, ScrollToTop, NoteViewer } from '../components/Common/index.js';
import { getHomeMovies, getMovieInfo } from '../services/home.js';
import { BounceLoader, MoonLoader, ClipLoader } from 'react-spinners';
import { MiniSlider } from '../components/Slider/MiniSlider';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BannerSliderSkeleton, FilterSkeleton, MiniSliderSkeleton, CardSkeleton } from '../components/Skeleton/HomePageSkeleton/index.js';
import { noteLine } from '../shared/constant.js';

const HomePage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [movies, setMovies] = React.useState([]);
  const [isMoviesLoaded, setIsMoviesLoaded] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dataMovies = await getHomeMovies();
        setMovies(dataMovies);

        const response = await getMovieInfo(dataMovies?.Phimmoi);
        setMovieDetails(response);

        setIsMoviesLoaded(true);

        // console.log(dataMovies);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    // if (movies.length > 0) {
    if (isMoviesLoaded) {
      // console.log(movieDetails);
      // console.log(movies);
    }
  }, [isMoviesLoaded, movies, movieDetails]);

  return (
    <div className=' bg-[#222d38]'>
      <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
        {error && <div>Gặp lỗi: {error.message}</div>}
        {isMoviesLoaded}
        <NoteViewer
          hidden={`hidden`}
          note={noteLine}
        />
        {isLoading ? (
          <div className='w-full'>
            <SkeletonTheme
              baseColor='#202020'
              highlightColor='#444'>
              <BannerSliderSkeleton />
              <FilterSkeleton />
              <MiniSliderSkeleton />
              <div className='lg:flex custom-page  shadow-lg gap-3 min-h-screen'>
                <div className='lg:w-3/4'>
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <Skeleton
                        height={30}
                        width={`25%`}
                        className='mb-2'
                      />
                      <div className='grid grid-cols-2 gap-2 md:grid-cols-4 min-[712px]:grid-cols-3 md:grid-rows-3 mb-5'>
                        {[...Array(12)].map((_, index) => (
                          <div key={index}>
                            <CardSkeleton
                              height={250}
                              width={`100%`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='lg:w-2/6'>
                  <Skeleton
                    className='h-screen lg:flex'
                    height={2000}
                  />
                </div>
              </div>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
                <MoonLoader
                  size={150}
                  color='#e06c26'
                  speedMultiplier={2}
                  className='z-50'
                />
              </div>
            </SkeletonTheme>
          </div>
        ) : (
          <>
            <BannerSlider
              films={movies}
              details={movieDetails}
            />
            <Filter />
            <MiniSlider films={movies} />
            <div className='lg:flex custom-page rounded-b-lg bg-[#151d25] shadow-lg  min-h-screen'>
              <div className='lg:w-3/4'>
                <SectionSlider films={movies} />
              </div>
              <div className='lg:w-2/6'>
                <TrendingNow />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
