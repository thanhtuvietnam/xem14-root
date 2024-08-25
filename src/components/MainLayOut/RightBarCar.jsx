// import * as React from 'react';
// import { useHoverState } from '../../shared/utils';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// const RightBarCar = ({ movieName, originName, year, thumbImage }) => {
//   const { isHovering, handleMouseEnter, handleMouseLeave } = useHoverState();
//   return (
//     <div
//       className={`rightbar-custom group shadow-2xl pt-2 ${isHovering ? 'animate-gradientMovertl' : 'animate-gradientMoveltr'}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}>
//       <div className='w-1/4 '>
//         <LazyLoadImage
//           src={thumbImage}
//           alt='movie'
//           className='group-hover:scale-110 object-cover h-20 duration-500 transition-transform '
//         />
//       </div>
//       <div className='w-3/4 grid place-items-start'>
//         <h2 className=' group-hover:text-[#da9d29] tw-multiline-ellipsis-2 text-[13px] font-light tracking-wide leading-5'>{movieName}</h2>
//         <div>
//           <p className='tracking-wide text-[#8a9eaf]'>
//             {originName}
//             <span className='ml-1'>({year})</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightBarCar;
// import * as React from 'react';
// import { useHoverState } from '../../shared/utils';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { Image } from 'antd'

// const RightBarCar = ({ movieName, originName, year, thumbImage }) => {
//   const { isHovering, handleMouseEnter, handleMouseLeave } = useHoverState();
//   return (
//     <div
//       className={`rightbar-custom group relative px-2 py-3 rounded-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
//       ${isHovering ? 'animate-gradientMovertl' : 'animate-gradientMoveltr'}
//       md:flex md:items-center md:gap-4 md:px-4
//     `}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}>
//       <div className='w-full md:w-1/4 lg:w-1/5'>
//         <LazyLoadImage
//           src={thumbImage}
//           alt='movie'
//           // className='group-hover:scale-110  duration-500 transition-transform '
//           className=' w-full object-cover h-auto rounded-md'
//         />
//       </div>
//       <div className='w-full md:w-3/4 lg:w-4/5 mt-2 md:mt-0'>
//         <h2 className='line-clamp-2 md:line-clamp-none font-semibold text-sm truncate md:text-xl group-hover:text-[#da9d29]'>{movieName}</h2>
//         <div>
//         <p className="text-gray-400 text-xs md:text-sm">
//             {originName}
//             <span className='ml-1'>({year})</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightBarCar;
import * as React from 'react';
import { useHoverState } from '../../shared/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RightBarCar = ({ movieName, originName, year,view, thumbImage, heightThumb, lineclampCss }) => {
  const { isHovering, handleMouseEnter, handleMouseLeave } = useHoverState();
  return (
    <div
      className={`rightbar-custom group relative px-2 py-3 rounded-md overflow-hidden transition duration-300 ease-in-out transform 
      ${isHovering ? 'animate-gradientMovertl' : 'animate-gradientMoveltr'}
      sm:flex  sm:items-center sm:gap-4 sm:px-4 
    `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={`w-full sm:w-1/4 lg:w-1/5 pr-2 sm:pr-0 overflow-hidden rounded-md ${heightThumb}`}>
        <LazyLoadImage
          src={thumbImage}
          alt='movie'
          // className='group-hover:scale-110  duration-500 transition-transform '
          className={`w-full object-cover h-auto rounded-md group-hover:-translate-y-1 group-hover:scale-105 transition duration-300 ease-in-out`}
        />
      </div>
      <div className={`w-full sm:w-3/4 lg:w-4/5 mt-2 sm:mt-0 line-clamp-6 sm:line-clamp-3 md:line-clamp-none ${lineclampCss} `}>
        <h2 className='line-clamp-2 sm:line-clamp-none text-[#1879bf] font-semibold text-sm sm:text-base md:text-lg group-hover:text-[#da9d29]'>{movieName}</h2>
        <div>
          <p className='text-gray-400 line-clamp-3 sm:line-clamp-none text-[9px] sm:text-[11px] md:text-sm'>
            {originName}
            <span className='ml-1'>({year})</span>
          </p>
        </div>
        <div><span>{view}</span></div>
      </div>
    </div>
  );
};

export default RightBarCar;
