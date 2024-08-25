import { tvShows } from '../services/danhsach/';
import { MovieCategory } from '../components/Common';

const TVShows = () => {
  return (
    <>
      <MovieCategory
        fetchFunction={tvShows}
        sectionTitle='TVSHOWS'
      />
    </>
  );
};

export default TVShows;
