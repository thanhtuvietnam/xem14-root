import React from 'react';
import { CarInfo, InfoBlock, ContentInfo, TableLink, RecommendMovie, LinkServer } from './index.js';
import { IMG_URL } from '../../shared/constant.js';
import { icons } from '../../shared/icon.js';
import { getYoutubeVideoId } from '../../shared/utils.js';
const { TbAlertTriangleFilled } = icons;

const SideMovieInfo = ({ detail, handleWatchMovie }) => {
  const [expandServer, setExpandServer] = React.useState(false);

  const movie = detail[0];
  const movieTrailerUrl = movie?.trailer_url;
  // console.log(movieTrailerUrl);
  const movieID = getYoutubeVideoId(movieTrailerUrl);
  // console.log(movieID);
  // console.log(movie.episodes[0])
  const movieServerName = movie?.episodes[0].server_name;
  const movieServerData = movie?.episodes[0].server_data;
  // console.log(movieServerData);

  const actors = movie?.actor.length === 0 || (movie?.actor.length === 1 && movie?.actor[0] === '') ? 'NaN' : movie?.actor.join(', ');
  const directors = movie?.director.length === 0 || (movie?.director.length === 1 && movie?.director[0] === '') ? 'NaN' : movie?.director.join(', ');

  return (
    <div>
      <div>
        <div className='grid md:flex gap-4 my-3'>
          <div className='md:w-[30%]'>
            {detail ? (
              <CarInfo
                handleWatchMovie={handleWatchMovie}
                trailerLink={movieID}
                setExpandServer={setExpandServer}
                image={`${IMG_URL}/${movie?.thumb_url} `}
                altname={movie?.name}
              />
            ) : (
              <div>đang tải</div>
            )}
          </div>
          <div className='md:w-[70%]'>
            <InfoBlock
              title={movie?.name}
              originalName={movie?.origin_name}
              episodeCurrent={movie?.episode_current}
              country={movie?.country.map((coun) => coun.name)}
              qua={movie?.quality}
              lang={movie?.lang}
              actor={actors}
              director={directors}
              category={movie?.category.map((cat) => cat.name)}
              year={movie?.year}
              time={movie?.time}
              view={movie?.view}
            />
          </div>
        </div>
        <div className={`${expandServer ? 'h-auto' : 'h-0'} overflow-hidden  mb-3 transition duration-500`}>
          <LinkServer
            onEpisodeClick={handleWatchMovie}
            serverName={movieServerName}
            serverData={movieServerData}
          />
        </div>
        <div className='text-[#eed238] text-[13.5px] flex items-center gap-3 bg-[#224361] p-[12px]  border-[#435567] mb-[10px]'>
          <TbAlertTriangleFilled size={35} />
          <p>Phim bị lỗi thì bình luận bên dưới để ad fix hoặc qua nhóm tele:...</p>
        </div>
        <div className='bg-[#101821] p-3 rounded-md  mb-2.5'>
          <ContentInfo data={movie} />
        </div>
        <div className='bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto overflow-x-scroll h-60 scroll-bar-custom'>
          <TableLink movieServerData={movieServerData} />
        </div>

        <div className='hidden min-[425px]:flex transition duration-300'>
          <RecommendMovie />
        </div>
      </div>
    </div>
  );
};

export default SideMovieInfo;
