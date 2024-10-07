import React from 'react';
import ReactPaginate from 'react-paginate';

interface IPaginationDesktopNewsProps {
  totalPage: number;
  handlePageChange: (arg: any) => void;
}

const PaginationDesktopNews = (props: IPaginationDesktopNewsProps) => {
  const { totalPage, handlePageChange } = props;
  return (
    <div>
      <ReactPaginate
        className='flex items-center flex-wrap'
        activeClassName='bg-[#0273BC] text-white text-base'
        pageClassName='rounded-full h-[32px] w-[32px] flex justify-center items-center text-black text-bas1'
        previousClassName='py-2 px-3'
        nextClassName='py-2 px-3'
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default PaginationDesktopNews;
