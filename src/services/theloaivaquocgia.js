import instance from "../shared/axiosConfig";
import { API_URL } from "../shared/constant";

const fetchData = async (genre) => {
  // const pageUrl = `${API_URL}/${genre}`;
  const pageUrl = `/${genre}`;
  try {
    const res = await instance.get(pageUrl);
    const data = await res?.data?.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log(`error in fetchData theloai.js: ${error}`);
  }
};
export const theLoai = async () => {
  return fetchData(`the-loai`);
};
export const quocGia = async () => {
  return fetchData(`quoc-gia`);
};

export const phim18 = (page) => {
  return fetchData(`the-loai/phim-18`, page);
};
