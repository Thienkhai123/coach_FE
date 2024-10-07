import React from "react";
import ReactPaginate from "react-paginate";

interface IPaginationNewsProps {
  totalPage: number;
  handlePageChange: (arg: any) => void;
}

const PaginationNews = (props: IPaginationNewsProps) => {
  const { totalPage, handlePageChange } = props;
  return (
    <div>
      <ReactPaginate
        className="flex items-center flex-wrap"
        activeClassName="bg-[#EBEBEB] text-black"
        pageClassName="rounded-full py-2 px-4 text-black"
        previousClassName="py-2 px-3"
        nextClassName="py-2 px-3"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default PaginationNews;
