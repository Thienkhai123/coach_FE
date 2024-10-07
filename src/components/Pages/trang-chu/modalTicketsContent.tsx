import React from "react";

interface IModalTicketContentProps {
  title: string;
  listTickets: number[];
  selectedTicket: number;
  onChoose: (arg: number) => void;
}

const ModalTicketContent = (props: IModalTicketContentProps) => {
  const { title, listTickets, selectedTicket, onChoose } = props;
  return (
    <div className="rounded-tl-2xl rounded-tr-2xl bg-white">
      <div className="bg-neutral-grey-100 py-3 px-4 rounded-tl-2xl rounded-tr-2xl">
        <p className="text-base font-semibold text-neutral-grey-700 text-center">
          {title}
        </p>
      </div>
      <div className="py-4">
        {listTickets?.map((ticket, ind) => {
          const isSlected = selectedTicket === ticket;
          return (
            <div
              key={`ticket-${ind}`}
              className={`flex gap-1 items-center py-1.5 px-4 border-b border-b-neutral-grey-100 ${
                isSlected ? "bg-secondary-600" : ""
              }`}
              onClick={() => onChoose(ticket)}
            >
              <input
                type="radio"
                className="accent-secondary-300 w-5 h-5"
                checked={isSlected}
              />
              <p className="text-center flex-1">{ticket}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalTicketContent;
