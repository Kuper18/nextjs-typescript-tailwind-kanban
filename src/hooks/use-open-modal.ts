import { useCallback, useState } from 'react';

const useOpenModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback((val: boolean) => setIsOpen(val), []);

  return { isOpen, toggleOpen };
};

export default useOpenModal;
