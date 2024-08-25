import { phimLe } from '../services/danhsach/';
import { MovieCategory } from '../components/Common';

const PhimLe = () => {
  return (
    <>
      <MovieCategory
        fetchFunction={phimLe}
        sectionTitle='Phim Lẻ'
      />
    </>
  );
};
export default PhimLe;
