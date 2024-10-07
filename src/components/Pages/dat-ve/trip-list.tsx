const TripList = ({ nextScreen = () => {} }) => {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(20)].map((el, ind) => {
        return (
          <div key={ind} className="w-full h-[200px] bg-white">
            <button onClick={nextScreen}>Choose</button>
          </div>
        );
      })}
    </div>
  );
};

export default TripList;
