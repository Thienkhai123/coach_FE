import { toast } from "react-toastify";

export const useCustomToast = () => {
  const toastSuccess = ({
    message,
    toastId,
  }: {
    message: string;
    toastId: string;
  }) => {
    toast.success(message, {
      toastId: toastId,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const toastError = ({
    message,
    toastId,
  }: {
    message: string;
    toastId: string;
  }) => {
    toast.error(message, {
      toastId: toastId,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return { toastSuccess, toastError };
};
