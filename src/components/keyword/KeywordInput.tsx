import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import CheckmarkIcon from '../../svg/CheckmarkIcon';
import { KeywordBubble, KeywordInputContainer } from './styled';

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
    <Chip color="primary" icon={<AddIcon />} label="Add" onClick={handleActivateInput}/>);

  const InputBar = (
    <KeywordInputContainer>
      {/* <KeywordInputBar autoFocus tabIndex={0} onChange={(e) => setInputText(e.target.value) } onKeyDown={(e) => onEnter(e)} placeholder="enter a keyword"/> */}
      <TextField label="keyword" 
        variant="outlined" 
        size="small" 
        autoFocus 
        tabIndex={0} 
        onChange={(e) => setInputText(e.target.value) } 
        onKeyDown={(e) => onEnter(e)}
      />
      <KeywordBubble style={{cursor: 'pointer'}} onClick={() => submit()}>
        <CheckmarkIcon />
      </KeywordBubble>
    </KeywordInputContainer>
  );

  return active ? InputBar : PlusButton;
};

export default KeywordInput;