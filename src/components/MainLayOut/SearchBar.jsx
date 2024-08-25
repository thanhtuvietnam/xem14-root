import React, { useState, useRef, useReducer, useEffect, useCallback } from 'react';
import { RightBarCar } from '../MainLayOut/index.js';
import { Link, useNavigate } from 'react-router-dom';
import { icons } from '../../shared/icon';
import instance from '../../shared/axiosConfig';
import { RingLoader } from 'react-spinners';
const { IoIosSearch } = icons;
import { IMG_URL } from '../../shared/constant.js';
import { useSearch } from '../../context/SearchContext.jsx';
import Tooltip from '@mui/joy/Tooltip';
import { useMediaQuery } from '@mui/material';

const initialState = {
  keyword: '',
  searchResults: [],
  isLoading: false,
  totalItems: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    // case 'SET_HOME_API_RESULTS':
    //   return { ...state, homeApiResults: action.payload };
    case 'SET_TOTAL_ITEMS':
      return { ...state, totalItems: action.payload };
    default:
      return state;
  }
};

const SearchBar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Thêm state này
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // Kiểm tra kích thước màn hình

  const navigate = useNavigate();

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { setSearchResults, setTotalItems, pageSearch, setKeyType, setIsLoading } = useSearch();

  //   console.log(inputRef);

  // console.log(state);

  const fetchHomeAPI = useCallback(async () => {
    dispatch({ type: 'SET_IS_LOADING', payload: true });
    try {
      const homeRes = await instance.get(`/home`);
      const totalItems = homeRes?.data?.data?.params?.pagination?.totalItems || 0;
      dispatch({ type: 'SET_TOTAL_ITEMS', payload: totalItems });
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu Home API:', error);
    } finally {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    }
  }, []);
  useEffect(() => {
    fetchHomeAPI();
  }, [fetchHomeAPI]);

  // const totalItemsSearch = state && state?.homeApiResults?.params?.pagination?.totalItems;

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (state.keyword) {
        setIsLoading(true); // Cập nhật isLoading trong context
        dispatch({ type: 'SET_IS_LOADING', payload: true });
        const searchApi = `/tim-kiem?keyword=${state?.keyword}&page=${pageSearch}`;
        try {
          const response = await instance.get(searchApi);
          const dataSearch = response?.data?.data;
          //   console.log(dataSearch.items);
          dispatch({ type: 'SET_SEARCH_RESULTS', payload: dataSearch });
          setSearchResults(dataSearch || []);
          setTotalItems(dataSearch?.params?.pagination?.totalItems || 0);
        } catch (error) {
          console.log(`lỗi khi tìm kiếm: ${error}`);
        } finally {
          dispatch({ type: 'SET_IS_LOADING', payload: false });
          setIsLoading(false); // Cập nhật isLoading trong context
        }
      } else {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [state?.keyword, pageSearch, setSearchResults, setTotalItems, setIsLoading]);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setShowDropdown(true);
    dispatch({ type: 'SET_KEYWORD', payload: e.target.value });
    setKeyType(e.target.value);
  };

  const handleKeyDownSearch = (event) => {
    if (event.key === 'Enter' && state?.keyword.trim() !== '') {
      navigate(`/tim-kiem?keyword=${state?.keyword}`);
      setShowDropdown(false);
    }
  };
  const handleClickSearch = () => {
    if (state?.keyword.trim() !== '') {
      // Kiểm tra xem input có chữ hay không
      navigate(`/tim-kiem?keyword=${state?.keyword}`);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Hàm xử lý sự kiện click trên document
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
        dispatch({ type: 'SET_KEYWORD', payload: '' });
      }
    };

    // Lắng nghe sự kiện click trên document
    document.addEventListener('click', handleClickOutside);

    // Hủy lắng nghe sự kiện khi component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Chạy useEffect một lần duy nhất khi component mount

  return (
    <div className='search-container sm:w-[300px] md:w-[400px]'>
      <div
        className=' items-center flex'
        ref={dropdownRef}>
        <Tooltip
          title={`enter hoặc nhấn 🔍 `}
          sx={{ color: 'black', textTransform: 'capitalize' }}
          placement={isSmallScreen ? 'top-end' : 'bottom-end'} // Thay đổi placement dựa trên kích thước màn hình
          arrow
          size='sm'
          color='warning'
          open={isInputFocused} // Kiểm soát hiển thị Tooltip dựa trên state isInputFocused
          variant='soft'>
          <input
            ref={inputRef}
            //   data-loading={state?.isLoading}
            className='text-[13px] border-[1px] border-[#ffbb35] truncate rounded-l-md rounded-r-none'
            type='text'
            value={state?.keyword}
            placeholder={`Search with ${state?.totalItems || 0} movie`}
            onChange={handleChange}
            onKeyDown={handleKeyDownSearch}
            onFocus={() => setIsInputFocused(true)} // Cập nhật state khi focus
            onBlur={() => setIsInputFocused(false)} // Cập nhật state khi blur
          />
        </Tooltip>
        {state?.isLoading && (
          <div className='loading '>
            <RingLoader
              loading={state?.isLoading}
              color='white'
              size={30}
              speedMultiplier={2}
            />
          </div>
        )}
        <div>
          <button
            className='hover:bg-black border-[1.5px] border-[#ff8a00]  p-[5.5px] rounded-r-md'
            // disabled={state?.keyword.length <= 1}
            onClick={handleClickSearch}>
            <IoIosSearch
              size={25}
              color='#ff8a00'
            />
          </button>
        </div>
      </div>

      {showDropdown && (
        <div>
          <ul
            ref={dropdownRef}
            className='scroll-bar-custom border-[1px] border-[#684808] flex flex-col max-h-[300px] sm:max-h-[400px] md:max-h-[470px] lg:max-h-[550px] xl:max-h-[650px]'>
            <div className='px-2 md:px-4 py-2 text-sm font-medium text-gray-400 capitalize sm:px-6 sm:text-base md:text-lg'>
              <p className=' truncate'>
                Bạn đang tìm: <span className='text-[#d50ac1]'>{state?.keyword}</span>
              </p>
            </div>
            {state?.searchResults?.items?.map((result, index) => (
              <Link
                to={`/chitiet-phim/${result?.slug}`}
                key={result._id}
                onClick={() => {
                  dispatch({ type: 'SET_KEYWORD', payload: '' }); // Xóa input khi click vào kết quả
                  setShowDropdown(false); // Đóng dropdown
                }}>
                <RightBarCar
                  thumbImage={`${IMG_URL}/${result?.thumb_url}`}
                  year={result?.year}
                  movieName={result?.name}
                  originName={result?.origin_name}
                  // heightThumb='h-auto'
                />
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
