import React, { useState } from 'react';
import Keyword from './Keyword';
import KeywordInput from './KeywordInput';
import { KeywordsContainer } from './styled';

export interface KeywordListProps {
  initialList?: Array<string>;
}
/**
 * KeywordList component
 * @returns 
 */
const KeywordList = (props: KeywordListProps) => {
  const {initialList = []} = props;
  const [keywordList, setKeywordList] = useState<Array<string>>(initialList);

  /**
   * add an item to keywordList
   * @param item 
   */
  const addItem = (item: string) => {
    setKeywordList([...keywordList, item]);
  };

  /**
   * remove an item from keywordList by index
   * @param index 
   */
  const removeItem = (index: number) => {
    setKeywordList(keywordList.filter((value, i) => i !== index));
  };

  return (
    <KeywordsContainer >
      {keywordList.map((value, index) => {
        return <Keyword key={index} label={value} onRemove={() => removeItem(index)} />;
      })}
      <KeywordInput onSubmit={addItem}/>
    </KeywordsContainer>
  );
};

export default KeywordList;