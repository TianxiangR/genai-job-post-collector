import React, { useState } from 'react';
import { KeywordBubble, KeywordInputBar, KeywordInputContainer } from './styled';
import PlusIcon from '../../svg/PlusIcon';
import CheckmarkIcon from '../../svg/CheckmarkIcon';

export interface KeywordInputProps {
  onSubmit?: (content: string) => void;
}

/**
 * Keyword Input component
 * @returns 
 */
const KeywordInput = (props: KeywordInputProps) => {
  const { onSubmit = () => undefined }= props;
  const [active, setActive] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  /**
   * wrapping onSubmit to clear the inputText and set t active state to false after the submission
   */
  const submit = () => {
    if (inputText !== '') {
      onSubmit(inputText);
    }
    setActive(false);
    setInputText('');
  };

  /**
   * 
   */
  const handleActivateInput = () => {
    setInputText('');
    setActive(true);
  };

  const onEnter = (e: React.KeyboardEvent<any>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      submit();
    }
  };

  const PlusButton = (
    <KeywordBubble style={{cursor: 'pointer'}} onClick={() => handleActivateInput()}>
      <PlusIcon />
    </KeywordBubble>);

  const InputBar = (
    <KeywordInputContainer>
      <KeywordInputBar autoFocus tabIndex={0} onChange={(e) => setInputText(e.target.value) } onKeyDown={(e) => onEnter(e)} placeholder="enter a keyword"/>
      <KeywordBubble style={{cursor: 'pointer'}} onClick={() => submit()}>
        <CheckmarkIcon />
      </KeywordBubble>
    </KeywordInputContainer>
  );

  return active ? InputBar : PlusButton;
};

export default KeywordInput;