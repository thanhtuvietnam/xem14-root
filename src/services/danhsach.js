import instance from '../shared/axiosConfig';
import { API_URL } from '../shared/constant';


const fetchData = async (endpoint, page) => {
  // const pageUrl = `${API_URL}/danh-sach/${endpoint}?page=${page}`;
  const pageUrl = `/danh-sach/${endpoint}?page=${page}`;

  try {
    const res = await instance.get(pageUrl);
    const data = await res?.data?.data;
    // console.log(data)
    return data;
  } catch (error) {
    console.log(`error in fetchData: ${error}`);
  }
};

export const phimBo = async (page) => {
  return fetchData(`phim-bo`, page);
};

export const phimLe = async (page) => {
  return fetchData(`phim-le`, page);
};
export const tvShows = async (page) => {
  return fetchData(`tv-shows`, page);
};
export const hoatHinh = async (page) => {
  return fetchData(`hoat-hinh`, page);
};
