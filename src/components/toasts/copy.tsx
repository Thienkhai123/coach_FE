const ToastCopy = ({ message = "Copied" }) => {
  return (
    <div className="p-4 bg-black w-fit py-2 px-4 mx-auto rounded-sm overflow-hidden">
      <p className="text-white">{message}</p>
    </div>
  );
};

export default ToastCopy;
