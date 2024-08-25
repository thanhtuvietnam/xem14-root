import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { icons } from '../../shared/icon.js';
import { SearchBar } from './index.js';
import Bookmark from '../Common/Bookmark.jsx';

const { FaBookmark } = icons;

const Header = () => {
  return (
    <div className='h-16 custom-bg'>
      <div className='h-full flex items-center justify-between text-[13px] text-[#e9eaee] leading-5 custom-page '>
        <div>
          <Link
            to='/'
            className='flex items-center gap-1.5 object-cover'>
            <LazyLoadImage
              src='/logo.jpg'
              className='h-10 w-10 ml-2.5 rounded-md'
            />
            <p className='text-2xl text-white font-bold whitespace-nowrap'>
              Cuồng <span className='text-[#1890ff]'>Phim</span>
            </p>
          </Link>
        </div>
        {/* <div className='px-10 py-[10px] w-[40%]'> */}
        <div className='hidden sm:flex'>
          <SearchBar />
        </div>
        <div className='bg-[#337ab7] rounded-2xl px-[15px] py-[6px] mr-4 mt-[1px] custom-bg2 shadow-custom text-sm items-center gap-1 hidden lg:flex'>
         <Bookmark/>
        </div>
      </div>
    </div>
  );
};

export default Header;
