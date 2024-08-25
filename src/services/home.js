import instance from '../shared/axiosConfig';
// import { movies } from '../shared/datatest';

export const getHomeMovies = async () => {
  const endpoints = {
    Phimmoi: '/danh-sach/phim-moi-cap-nhat',
    Phimbo: '/danh-sach/phim-bo',
    Phimle: '/danh-sach/phim-le',
    TVShows: '/danh-sach/tv-shows',
    Hoathinh: '/danh-sach/hoat-hinh',
  };
  // const endpoints = '/trending/movie/day';
  try {
    const responses = await Promise.all(
      Object.entries(endpoints).map(async ([key, url]) => {
        try {
          const response = await instance.get(url);
          return response;
        } catch (error) {
          console.error(`Lỗi khi lấy dữ liệu ${key}:`, error);
          return [];
        }
      })
    );
    // console.log(responses);
    const movieLists = responses.reduce((final, current, index) => {
      final[Object.entries(endpoints)[index][0]] = current.data?.data?.items.map((item) => ({
        ...item,
      }));
      return final;
    }, {});
    // console.log(movieLists);
    return movieLists;
  } catch (error) {
    console.error('Lỗi tổng thể khi lấy dữ liệu phim:', error);
    return {};
  }
};

/* -------------------------------------------------------------------------- */

export const getMovieInfo = async (movies) => {
  try {
    const detailRes = await Promise.all(movies.map((movie) => instance.get(`/phim/${movie.slug}`)));
    // console.log(detailRes);
    const moviedetail = detailRes
      .map((res) => {
        if (res?.data?.data?.item) {
          return res?.data?.data?.item;
        } else {
          console.log(`Error in const moviedetail: ${res}`);
        }
      })
      .filter((item) => item !== null);
    // console.log(moviedetail);

    return moviedetail;
  } catch (error) {
    console.log(`GetMovieInfo's error: ${error}`);
    return [];
  }
};
// getMovieInfo();
