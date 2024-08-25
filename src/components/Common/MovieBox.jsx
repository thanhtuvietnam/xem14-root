// import React, { useState, useEffect, useRef, forwardRef } from 'react';
// import '@vidstack/react/player/styles/base.css';
// import '@vidstack/react/player/styles/plyr/theme.css';
// import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
// import { IMG_URL } from '../../shared/constant';
// import { MediaPlayer, MediaProvider, Poster, Track, Spinner } from '@vidstack/react';
// import { icons } from '../../shared/icon';

// const { TbRewindForward10, TbRewindBackward10 } = icons;

// const FAST_SEEK_TIME = 10;
// const SeekButton = forwardRef(({ direction, player }, ref) => {
//   const handleClick = () => {
//     if (player) {
//       player.currentTime += direction === 'forward' ? FAST_SEEK_TIME : -FAST_SEEK_TIME;
//     }
//   };

//   return (
//     <button ref={ref} onClick={handleClick} className={`seek-button seek-${direction}`}>
//       {direction === 'forward' ? <TbRewindForward10 size={25}/> : <TbRewindBackward10 size={25}/>}
//     </button>
//   );
// });
// const MovieBox = ({ episode, poster }) => {
//   const playerRef = useRef(null);
//   const seekForwardRef = useRef(null);
//   const seekBackwardRef = useRef(null);

//   //   console.log(posterUrl)
//   const [loading, setLoading] = useState(false);

//   const handleSeeking = () => {
//     setLoading(true);
//   };

//   const handleSeeked = () => {
//     setLoading(false);
//   };

//   return (
//     <div className='mt-2'>
//       <MediaPlayer
//         ref={playerRef}
//         src={episode?.link_m3u8}
//         viewType='video'
//         streamType='on-demand'
//         logLevel='warn'
//         crossOrigin='mixed'
//         // autoPlay={true}
//         hideControlsOnMouseLeave={false}
//         load='eager'
//         onSeeking={handleSeeking}
//         onSeeked={handleSeeked}
//         poster={`${IMG_URL}/${poster}`}>
//         <MediaProvider>
//           <PlyrLayout
//             clickToPlay={true}
//             translations='any'
//             title='Cuồng phim'
//             icons={plyrLayoutIcons}
//             seekTime={10}
//             displayDuration={true}
//             invertTime={true}
//             slots={{
//               afterDuration: (
//                 <SeekButton ref={seekBackwardRef} direction="backward" player={playerRef.current} />
//               ),
//               afterCurrentTime: (
//                 <SeekButton ref={seekForwardRef} direction="forward" player={playerRef.current} />
//               ),
//             }}
//           />
//         </MediaProvider>

//         {loading && (
//           // <div className='pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center'>
//           //   <div className='animate-spin rounded-full h-20 w-20 border-8 border-t-transparent border-[#999090]'></div>
//           // </div>
//           <div className='pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center'>
//             <Spinner.Root
//               className='text-white  transition-opacity duration-200 ease-linear animate-spin opacity-100'
//               size={84}>
//               <Spinner.Track
//                 className='opacity-25'
//                 width={8}
//               />
//               <Spinner.TrackFill
//                 className='opacity-75'
//                 width={8}
//               />
//             </Spinner.Root>
//           </div>
//         )}
//       </MediaPlayer>
//       <button>tap tiep theo</button>
//     </div>
//   );
// };

// export default MovieBox;
import { useState } from 'react';
import { MediaPlayer, MediaProvider, Spinner, ToggleButton } from '@vidstack/react';
import { PlyrLayout } from '@vidstack/react/player/layouts/plyr';
import { ThumbsDownIcon, ThumbsUpIcon } from '@vidstack/react/icons';
import { customPlyrIcons } from '../../shared/icon';
import Rating from '@mui/material/Rating';
import { icons } from '../../shared/icon';

import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { IMG_URL } from '../../shared/constant';
const { ImStarEmpty } = icons;

const PlyrControl = [
  'play-large', // The large play button in the center
  'restart', // Restart playback
  'play', // Play/pause playback
  'progress', // The progress bar and scrubber for playback and buffering
  'current-time', // The current time of playback
  'duration', // The full duration of the media
  'rewind', // Rewind by the seek time (default 10 seconds)
  'fast-forward', // Fast forward by the seek time (default 10 seconds)
  // 'download',
  // 'mute',
  'volume', // Volume control
  'settings', // Settings menu
  'pip', // Picture-in-picture (currently Safari only)
  'fullscreen', // Toggle fullscreen
];

const MovieBox = ({ episode, poster }) => {
  // console.log(poster)
  const [loading, setLoading] = useState(false);
  const handleSeeking = () => {
    setLoading(true);
  };
  const handleSeeked = () => {
    setLoading(false);
  };
  return (
    <div className='mt-2 relative'>
      <MediaPlayer
        streamType='on-demand'
        load='eager'
        viewType='video'
        crossOrigin='mixed'
        poster={`${IMG_URL}/${poster}`}
        src={episode?.link_m3u8}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}>
        <MediaProvider />
        <PlyrLayout
          // thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
          clickToFullscreen={false}
          clickToPlay={false}
          toggleTime={true}
          icons={customPlyrIcons}
          controls={PlyrControl}
        />
        {loading && (
          <div className='pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center'>
            <Spinner.Root
              className='text-white  transition-opacity duration-200 ease-linear animate-spin opacity-100'
              size={84}>
              <Spinner.Track
                className='opacity-25'
                width={8}
              />
              <Spinner.TrackFill
                className='opacity-75'
                width={8}
              />
            </Spinner.Root>
          </div>
        )}
      </MediaPlayer>
      <div className='flex items-center '>
        <ToggleButton
          className='group ring-sky-400 relative inline-flex h-4 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset data-[focus]:ring-4'
          aria-label='Like video'>
          <ThumbsUpIcon
            className='w-8 h-6 hidden group-data-[pressed]:block'
            color='#4bc729'
          />
          <ThumbsDownIcon
            className='w-8 h-6 group-data-[pressed]:hidden'
            color='#c94436'
          />
        </ToggleButton>
        <div className='flex'>
          <div>
            <span>*0/5(0 lượt)</span>
          </div>
          <Rating
            // emptyIcon={<ImStarEmpty color='white' />}
            name='half-rating'
            defaultValue={2.5}
            precision={0.5}
          />
        </div>
      </div>
    </div>
  );
};
export default MovieBox;
