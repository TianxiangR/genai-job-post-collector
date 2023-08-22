import React, { useState } from 'react';
import CloseIcon from '../../svg/CloseIcon';
import { CloseButton, KeywordBubble, KeywordText } from './styled';

export interface KeywordProps {
    label: string;
    onRemove?: () => void;
}

/**
 * Keyword component
 * @param props 
 * @returns 
 */
const Keyword = (props: KeywordProps) => {
  const { label, onRemove = () => undefined} = props;
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
    <KeywordBubble onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <KeywordText>
        {label}
      </KeywordText>

      {isMouseOver && <CloseButton onClick={() => onRemove()}>
        <CloseIcon />
      </CloseButton>}
    </KeywordBubble>
  );
};

export default Keyword;