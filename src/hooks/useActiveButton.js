import { useState } from 'react';

export const useActiveButton = (initialValue = null) => {
  const [activeButton, setActiveButton] = useState(initialValue);
  const handleClick = (index) => {
    setActiveButton(index);
  };
  return [activeButton, handleClick];
};
