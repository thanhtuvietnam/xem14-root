import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { convertToSlug } from '../../shared/utils';
import { HomeOutlined, VideoCameraOutlined, PlaySquareOutlined, SmileOutlined, TrophyOutlined, GlobalOutlined, AppstoreOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { IoLogoOctocat } from 'react-icons/io';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import './index.css';
import { navLists } from '../../shared/constant';

const { Sider } = Layout;
const { SubMenu } = Menu;

const icons = [<HomeOutlined />, <VideoCameraOutlined />, <PlaySquareOutlined />, <TrophyOutlined />, <IoLogoOctocat />, <AppstoreOutlined />, <GlobalOutlined />, <SmileOutlined />, <ClockCircleOutlined />, <CloseOutlined />];

const SideBar = ({ onCloseSideBar, isSidebarActive, state }) => {
  const [showDropDown, setShowDropDown] = useState(null);

  const handleMouseEnter = (item) => {
    setShowDropDown(item);
  };

  const handleMouseLeave = () => {
    setShowDropDown(null);
  };

  const handleItemClick = () => {
    if (window.innerWidth <= 1024) {
      onCloseSideBar();
    }
  };

  const menuItems = navLists.map((item, index) => {
    if (item === 'THỂ LOẠI') {
      return {
        key: item,
        icon: icons[index],
        label: item,
        children: state?.subMenuTheLoais?.items?.map((theLoai) => ({
          key: theLoai.name,
          label: (
            <Link
              to={`/the-loai/${theLoai.slug}`}
              onClick={handleItemClick}>
              {theLoai.name}
            </Link>
          ),
        })),
      };
    } else if (item === 'QUỐC GIA') {
      return {
        key: item,
        icon: icons[index],
        label: item,
        children: state?.subMenuQuocGias?.items?.map((quocGia) => ({
          key: quocGia.name,
          label: (
            <Link
              to={`/quoc-gia/${quocGia.slug}`}
              onClick={handleItemClick}>
              {quocGia.name}
            </Link>
          ),
        })),
      };
    } else {
      return {
        key: item,
        icon: icons[index],
        label: (
          <Link
            to={`/${convertToSlug(item)}`}
            onClick={handleItemClick}>
            {item}
          </Link>
        ),
      };
    }
  });

  return (
    <div>
      <div className={`sidebar  ${isSidebarActive ? 'active' : ''}`}>
        <div className='relative custom-bg rounded-tr-lg'>
          <div className='flex items-center justify-between'>
            <div className='logo'>
              <LazyLoadImage
                src='/logo.jpg'
                alt='Logo'
              />
            </div>
            <div className='mr-5'>
              <span className='logo-text'>
                Cuồng <span className='text-primary'>Phim</span>
              </span>
            </div>
            <button
              onClick={onCloseSideBar}
              className='text-black text-xl mr-1.5 rounded-full px-1 x-button'>
              <CloseOutlined />
            </button>
          </div>
        </div>
        <Menu
          className='overflow-y-scroll scroll-bar-custom'
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['TRANG CHỦ']}
          items={menuItems}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div
        onClick={onCloseSideBar}
        className={`bg-black/60 z-[5] fixed top-0 left-0 w-full h-full visible lg:invisible md:opacity-0 transition duration-300  ${isSidebarActive ? 'opacity-100 visible' : 'opacity-0 invisible'} media-screen`}></div>
    </div>
  );
};

export default SideBar;

/* -------------------------------------------------------------------------- */
// import * as React from 'react';
// import './index.css';
// import { navLists } from '../../shared/constant';
// import { Link, useNavigate } from 'react-router-dom';
// import { convertToSlug } from '../../shared/utils';
// import { icons } from '../../shared/icon';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// const { IoClose, IoMdArrowDropdown } = icons;

// const SideBar = ({ onCloseSideBar, isSidebarActive, state }) => {
//   const navigate = useNavigate();
//   const [showDropDown, setShowDropDown] = React.useState(null);

//   const navListsSlug = React.useMemo(() => navLists.map((text) => convertToSlug(text)), []); // Sử dụng useMemo để tránh tính toán lại khi component re-render

//   const handleMouseEnter = (item) => {
//     setShowDropDown(item);
//   };

//   const handleMouseLeave = () => {
//     setShowDropDown(null);
//   };

//   const handleItemClick = (index) => {
//     navigate(`/${navListsSlug[index]}`);
//   };

//   const handleDropdownClick = (navList) => {
//     setShowDropDown((prevShowDropDown) => (prevShowDropDown === navList ? null : navList)); // Sử dụng callback function trong setState để đảm bảo cập nhật state một cách chính xác
//   };

//   return (
//     <div>
//       <div
//         onClick={onCloseSideBar}
//         className={`sidebar  ${isSidebarActive ? 'active' : ''}`}>
//         <div className='relative custom-bg h-[10%] rounded-tr-lg'>
//           <IoClose
//             size={30}
//             className='text-[#989898] hover:text-[#ff8a00] absolute top-1/2 right-3 transition duration-300'
//           />
//           <div className='flex items-center absolute top-1/3 right-1/3 '>
//             <LazyLoadImage
//               src='/logo.jpg'
//               alt="Logo" // Thêm thuộc tính alt cho hình ảnh
//               className='h-10 w-10 ml-2.5 rounded-md'
//             />
//             <p className='text-xl ml-2 font-bold '>
//               Cuồng <span className='font-semibold text-[#dea957]'>Phim</span>
//             </p>
//           </div>
//         </div>
//         <ul className='text-[#989898] flex flex-col items-center gap-3  shadow-lg h-screen custom-page'>
//           {navLists.map((navList, index) => (
//             <li
//               key={index}
//               className='relative hover:text-[#ff8a00] border-r-4 w-full border-[#ff8a00] transition duration-300  hover:bg-[#000000]'
//               onMouseLeave={handleMouseLeave}>
//               {navList === 'THỂ LOẠI' || navList === 'QUỐC GIA' ? (
//                 <div
//                   className={`px-2.5 py-3.5 dropdown-sidebar hover:text-[#ff8a00] hover:bg-[#000000] hover:translate-y-0 cursor-pointer  ${
//                     showDropDown === navList ? 'bg-[#223344]' : ''
//                   }`}
//                   onClick={() => handleDropdownClick(navList)}>
//                   <div className='flex items-center justify-center'>
//                     {navList}
//                     <IoMdArrowDropdown />
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   className={`px-2.5 py-3.5 hover:text-[#ff8a00] hover:bg-[#000000] hover:translate-y-0 cursor-pointer `}
//                   onClick={() => handleItemClick(index)}>
//                   {navList}
//                 </div>
//               )}
//               {/* dropdown */}
//               {showDropDown === navList && (
//                 <div
//                   className=' bg-[#1f3d58] shadow-custom py-2 rounded-lg w-96 z-50 rounded-t-none '

//                   onMouseEnter={() => handleMouseEnter(navList)}
//                   onMouseLeave={handleMouseLeave}>

//                   <div>
//                     {index === 5 && (
//                       <div className='grid grid-cols-3 '>
//                         {state?.subMenuTheLoais?.items?.map((subMenuTheLoai) => (
//                           <Link
//                             to={`/the-loai/${subMenuTheLoai?.slug}`}
//                             key={subMenuTheLoai?._id}
//                             className='p-2'>
//                             {subMenuTheLoai?.name}

//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                     {index === 6 && (
//                       <div className='grid grid-cols-3'>
//                         {state?.subMenuQuocGias?.items?.map((subMenuQuocGia) => (
//                           <Link
//                             to={`/quoc-gia/${subMenuQuocGia?.slug}`}
//                             key={subMenuQuocGia?._id}
//                             className='p-2'>
//                             {subMenuQuocGia?.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div
//         onClick={onCloseSideBar}
//         className={`bg-black/60 z-[5] fixed top-0 left-0 w-full h-full visible lg:invisible md:opacity-0 transition duration-300  ${
//           isSidebarActive ? 'opacity-100 visible' : 'opacity-0 invisible'
//         } media-screen`}></div>
//     </div>
//   );
// };

// export default SideBar;
