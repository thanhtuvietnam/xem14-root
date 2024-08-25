import { useEffect, useReducer, useState, useRef } from 'react';
import { SearchBar, SideBar } from '../MainLayOut/index.js';
import { icons } from '../../shared/icon.js';
import { Link, useNavigate } from 'react-router-dom';
import { navLists } from '../../shared/constant.js';
import { convertToSlug } from '../../shared/utils.js';
import { useActiveButton } from '../../hooks/useActiveButton.js';
import { quocGia, theLoai } from '../../services/theloaivaquocgia.js';
import UtilityButton from '../Common/UtilityButton.jsx';

const { MdOutlineMenu, FaBookmark, IoIosSearch, HiOutlineDotsVertical, IoMdArrowDropdown, PiArrowLineUpBold } = icons;

const NavBar = () => {
  // console.log(navListsSlug)
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, handleClick] = useActiveButton(navLists);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const initialState = {
    subMenuTheLoais: [],
    subMenuQuocGias: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_SUBMENU_THELOAI':
        return { ...state, subMenuTheLoais: action.payload };
      case 'SET_SUBMENU_QUOCGIA':
        return { ...state, subMenuQuocGias: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [theloaiRes, quocgiaRes] = await Promise.all([theLoai(), quocGia()]);
        dispatch({ type: 'SET_SUBMENU_THELOAI', payload: theloaiRes });
        dispatch({ type: 'SET_SUBMENU_QUOCGIA', payload: quocgiaRes });
      } catch (error) {
        console.log(`lỗi ở fetchData navbar: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const navListsSlug = navLists.map((text) => convertToSlug(text));

  const handleItemClick = (index) => {
    handleClick(index);
    navigate(`/${navListsSlug[index]}`);
  };

  const handleMouseEnter = (item) => {
    setShowDropDown(item);
  };
  const handleMouseLeave = () => {
    setShowDropDown(false);
  };

  const handleDropdownClick = (item) => {
    setShowDropDown((prev) => (prev === item ? 'null' : item));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className=' bg-[#12171b] shadow-custom'>
      <ul className='text-[#989898] hidden lg:flex custom-page list-none items-center justify-start text-[15px] font-normal transition duration-300'>
        {navLists &&
          navLists.map((navList, index) => (
            <li
              key={index}
              className='relative'
              // onMouseLeave={handleMouseLeave}
            >
              {navList === 'THỂ LOẠI' || navList === 'QUỐC GIA' ? (
                <div
                  ref={showDropDown === navList ? dropdownRef : null} // Gắn ref khi dropdown hiển thị
                  className={`px-2.5 py-3.5 dropdown hover:text-[#ff8a00] hover:bg-[#000000] hover:translate-y-0 cursor-pointer ${activeButton === index ? 'bg-[#223344]' : ''}`}
                  onClick={() => handleDropdownClick(navList)} // Thêm onClick
                >
                  <div className='flex items-center justify-center'>
                    {navList}
                    <IoMdArrowDropdown />
                  </div>
                </div>
              ) : (
                <div
                  className={`px-2.5 py-3.5 hover:text-[#ff8a00] hover:bg-[#000000] hover:translate-y-0 cursor-pointer ${activeButton === index ? 'bg-[#223344]' : ''}`}
                  onClick={() => handleItemClick(index)}>
                  {navList}
                </div>
              )}
              {showDropDown === navList && (
                <div
                  ref={showDropDown === navList ? dropdownRef : null}
                  className='absolute left-0 bg-[#1f3d58] shadow-custom py-2 rounded-lg w-96 z-50 rounded-t-none '
                  // onMouseEnter={() => handleMouseEnter(navList)}
                  onMouseLeave={handleMouseLeave}>
                  {isLoading ? (
                    <div className='absolute bg-black w-96 h-5 z-50 '></div>
                  ) : (
                    <div>
                      {index === 5 && ( // Kiểm tra index để hiển thị đúng dropdown
                        <div className='grid grid-cols-3 '>
                          {state &&
                            state?.subMenuTheLoais?.items?.map((subMenuTheLoai) => (
                              <Link
                                to={`/the-loai/${subMenuTheLoai.slug}`} // Điều chỉnh route cho thể loại
                                key={subMenuTheLoai._id}
                                className='p-2'>
                                {subMenuTheLoai.name}
                              </Link>
                            ))}
                        </div>
                      )}
                      {index === 6 && ( // Kiểm tra index để hiển thị đúng dropdown
                        <div className='grid grid-cols-3'>
                          {state &&
                            state?.subMenuQuocGias?.items?.map((subMenuQuocGia) => (
                              <Link
                                to={`/quoc-gia/${subMenuQuocGia.slug}`} // Điều chỉnh route cho quốc gia
                                key={subMenuQuocGia._id}
                                className='p-2'>
                                {subMenuQuocGia.name}
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>

      {/* sideBar */}
      <div className='lg:hidden flex items-center justify-between text-[#a5a5a5] custom-page'>
        <button
          id='myButton'
          className='py-[9px] px-[10px] hover:bg-slate-800	'
          onClick={() => setIsSideBarActive((ev) => !ev)}>
          <MdOutlineMenu size={30} />
        </button>
        <div className='flex items-center gap-2.5'>
          <div className='max-sm:flex hidden'>
            <SearchBar />
          </div>
          <div className='flex relative h-5'>
            <FaBookmark size={17} />
            <span className='bg-red-700 rounded-full absolute text-sm px-1 transform -translate-y-full left-2.5 top-1.5'>0</span>
          </div>
          <HiOutlineDotsVertical size={17} />
        </div>
      </div>
      <div>
        <SideBar
          state={state}
          isSidebarActive={isSideBarActive}
          onCloseSideBar={() => setIsSideBarActive(false)}
        />
      </div>
      <div className='hidden md:flex'>
        <UtilityButton />
      </div>
    </div>
  );
};

export default NavBar;

// import { useEffect, useReducer, useState } from 'react';
// import { SideBar } from '../MainLayOut/index.js';
// import { icons } from '../../shared/icon.js';
// import { Link, useNavigate } from 'react-router-dom';
// import { navLists } from '../../shared/constant.js';
// import { convertToSlug } from '../../shared/utils.js';
// import { useActiveButton } from '../../hooks/useActiveButton.js';
// import { quocGia, theLoai } from '../../services/theloaivaquocgia.js';
// import { FloatButton } from 'antd';
// const { MdOutlineMenu, FaBookmark, IoIosSearch, HiOutlineDotsVertical, IoMdArrowDropdown, PiArrowLineUpBold } = icons;
// import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';

// const NavBar = () => {
//   // const [activeButton, handleClick] = useActiveButton();
//   // console.log(navListsSlug)
//   const [isSideBarActive, setIsSideBarActive] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeButton, handleClick] = useActiveButton(navLists);
//   const [showDropDown, setShowDropDown] = useState(false);
//   const navigate = useNavigate();

//   const initialState = {
//     subMenuTheLoais: [],
//     subMenuQuocGias: [],
//   };

//   const reducer = (state, action) => {
//     switch (action.type) {
//       case 'SET_SUBMENU_THELOAI':
//         return { ...state, subMenuTheLoais: action.payload };
//       case 'SET_SUBMENU_QUOCGIA':
//         return { ...state, subMenuQuocGias: action.payload };
//       default:
//         return state;
//     }
//   };
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     setIsLoading(true);
//     const fetchData = async () => {
//       try {
//         const [theloaiRes, quocgiaRes] = await Promise.all([theLoai(), quocGia()]);
//         dispatch({ type: 'SET_SUBMENU_THELOAI', payload: theloaiRes });
//         dispatch({ type: 'SET_SUBMENU_QUOCGIA', payload: quocgiaRes });
//       } catch (error) {
//         console.log(`lỗi ở fetchData navbar: ${error}`);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
//   const navListsSlug = navLists.map((text) => convertToSlug(text));

//   const handleItemClick = (index) => {
//     handleClick(index);
//     navigate(`/${navListsSlug[index]}`);
//   };

//   const handleMouseEnter = (item) => {
//     setShowDropDown(item);
//   };
//   const handleMouseLeave = () => {
//     setShowDropDown(false);
//   };

//   return (
//     <div className=' bg-[#12171b] shadow-custom'>
//       <ul className='text-[#989898] hidden lg:flex custom-page list-none items-center justify-start text-[15px] font-normal transition duration-300'>
//         {navLists &&
//           navLists.map((navList, index) => (
//             <li
//               key={index}
//               className='relative'
//               onMouseLeave={handleMouseLeave}>
//               {navList === 'THỂ LOẠI' || navList === 'QUỐC GIA' ? (
//                 <div
//                   className={`px-2.5 py-3.5 dropdown hover:text-[#ff8a00] hover:bg-[#000000] hover:translate-y-0 cursor-pointer  ${activeButton === index ? 'bg-[#223344]' : ''}`}
//                   onMouseEnter={() => handleMouseEnter(navList)}>
//                   <div className='flex items-center justify-center'>
//                     {navList}
//                     <IoMdArrowDropdown />
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   className={`px-2.5 py-3.5 hover:text-[#ff8a00] hover:bg-[#000000] hover:translate-y-0 cursor-pointer ${activeButton === index ? 'bg-[#223344]' : ''}`}
//                   onClick={() => handleItemClick(index)}>
//                   {navList}
//                 </div>
//               )}
//               {/* dropdown */}
//               {showDropDown === navList && (
//                 <div
//                   className='absolute left-0 bg-[#1f3d58] shadow-custom py-2 rounded-lg w-96 z-50 rounded-t-none '
//                   onMouseEnter={() => handleMouseEnter(navList)}
//                   onMouseLeave={handleMouseLeave}>
//                   {/* <div className='dropdown'></div> */}
//                   {isLoading ? (
//                     <div className='absolute bg-black w-96 h-5 z-50 '></div>
//                   ) : (
//                     <div>
//                       {index === 5 && ( // Kiểm tra index để hiển thị đúng dropdown
//                         <div className='grid grid-cols-3 '>
//                           {state &&
//                             state?.subMenuTheLoais?.items?.map((subMenuTheLoai) => (
//                               <Link
//                                 to={`/the-loai/${subMenuTheLoai.slug}`} // Điều chỉnh route cho thể loại
//                                 key={subMenuTheLoai._id}
//                                 className='p-2'>
//                                 {subMenuTheLoai.name}
//                               </Link>
//                             ))}
//                         </div>
//                       )}
//                       {index === 6 && ( // Kiểm tra index để hiển thị đúng dropdown
//                         <div className='grid grid-cols-3'>
//                           {state &&
//                             state?.subMenuQuocGias?.items?.map((subMenuQuocGia) => (
//                               <Link
//                                 to={`/quoc-gia/${subMenuQuocGia.slug}`} // Điều chỉnh route cho quốc gia
//                                 key={subMenuQuocGia._id}
//                                 className='p-2'>
//                                 {subMenuQuocGia.name}
//                               </Link>
//                             ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </li>
//           ))}
//       </ul>

//       {/* sideBar */}
//       <div className='lg:hidden flex items-center justify-between text-[#a5a5a5] custom-page'>
//         <button
//           id='myButton'
//           className='py-[9px] px-[10px] hover:bg-slate-800	'
//           onClick={() => setIsSideBarActive((ev) => !ev)}>
//           <MdOutlineMenu size={30} />
//         </button>
//         <div className='flex gap-6'>
//           <div className='flex relative h-5'>
//             <FaBookmark size={17} />
//             <span className='bg-red-700 rounded-full absolute text-sm px-1 transform -translate-y-full left-2.5 top-1.5'>0</span>
//           </div>
//           <IoIosSearch size={17} />
//           <HiOutlineDotsVertical size={17} />
//         </div>
//       </div>
//       <div>
//         <SideBar
//           state={state}
//           isSidebarActive={isSideBarActive}
//           onCloseSideBar={() => setIsSideBarActive(false)}
//         />
//       </div>
//       <div className='hidden md:flex'>
//         <FloatButton.Group
//           trigger='hover'
//           type='primary'
//           style={{
//             insetInlineEnd: 24,
//           }}
//           icon={<CustomerServiceOutlined />}>
//           <FloatButton />
//           <FloatButton icon={<CommentOutlined />} />
//         </FloatButton.Group>
//         <FloatButton.BackTop
//           style={{
//             insetInlineEnd: 94,
//           }}
//           type='primary'
//           duration={100}
//           icon={<PiArrowLineUpBold />}
//         />
//       </div>
//     </div>
//   );
// };

// export default NavBar;
