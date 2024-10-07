import { useState } from "react";

type UseModalReturnType = [boolean, () => void];

const useModal = (): UseModalReturnType => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = (): void => {
    if (open) {
      if (screen.width > 850) {
        document.body.style.overflow = "auto";
      }
      setOpen(false);
    } else {
      if (screen.width > 850) {
        document.body.style.overflow = "hidden";
      }
      setOpen(true);
    }
  };

  return [open, toggleModal];
};

export default useModal;
