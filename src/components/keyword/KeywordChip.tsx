import Chip from '@mui/material/Chip';
import React, { useState } from 'react';

export interface KeywordProps {
    label: string;
    onRemove?: () => void;
}

/**
 * Keyword component
 * @param props 
 * @returns 
 */
const KeywordChip = (props: KeywordProps) => {
  const { label, onRemove} = props;
  const [isMouseOver, setMouseOver] = useState<boolean>(false);

  /**
   * set isMouseOver to true when the mouse is over a component
   */
  const handleMouseOver = () => {
    setMouseOver(true);
  };

  /**
   * set isMouseOver to false when the mouse is over a component
   */
  const handleMouseOut = () => {
    setMouseOver(false);
  };

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Chip label={label} variant="outlined" onDelete={isMouseOver ? onRemove : undefined}/>
    </div>
  );
};

export default KeywordChip;