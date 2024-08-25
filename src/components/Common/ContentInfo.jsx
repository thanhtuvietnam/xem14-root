import * as React from 'react';

const ContentInfo = ({ data }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const contentBlock = data?.content;
  const contentBlockWithoutTags = contentBlock?.replace(/<[^>]+>/g, '');
  const contentBlockSplitted = [contentBlockWithoutTags?.slice(0, contentBlockWithoutTags?.length / 2), contentBlockWithoutTags?.slice(contentBlockWithoutTags?.length / 2)];
  // console.log(contentBlockJoin);

  return (
    <div>
      <div className='text-[#989898] text-[13.5px] '>
        <div className='sectionTitle-custom border-b py-3 mb-3.5'>
          <span className='sectionTitle-custom'>Nội dung phim</span>
        </div>
        <p className='leading-[1.8] mb-4'>{isExpanded ? `${contentBlockWithoutTags}` : `${contentBlockSplitted[0]}...`}</p>
        <button
          className='text-white button-two rounded-md px-2'
          onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? <span>Thu gọn...</span> : <span>Mở rộng...</span>}
        </button>
      </div>
    </div>
  );
};

export default ContentInfo;
