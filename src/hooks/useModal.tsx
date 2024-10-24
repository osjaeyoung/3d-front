import { useState } from "react";

export const useModal = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    onOpen,
    onClose,
  };
};
