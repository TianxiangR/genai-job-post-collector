import { Divider, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useReducer } from 'react';
import { STORAGE_NAMESPACES, getItemFromStorageByKey, runChromeUtilWithSafeGaurdAsync, setItemToStorageByKey } from '../../chromeUtils';
import keywordsReducer, { KEYWORDS_ACTIONS, initialKeywords } from '../../reducers/keywordsReducer';
import KeywordChip from './KeywordChip';
import KeywordInput from './KeywordInput';
import { KeywordsContainer } from './styled';

/**
 * KeywordList component
 * @returns 
 */
const KeywordList = () => {
  const [{primaryKeywords, secondaryKeywords, exclusionKeywords}, dispatch] = useReducer(keywordsReducer, initialKeywords);

  useEffect(() => {
    runChromeUtilWithSafeGaurdAsync(() => getItemFromStorageByKey(STORAGE_NAMESPACES.PRIMARY_KEYWORDS)).
      then((item) => {
        dispatch({
          type: KEYWORDS_ACTIONS.SET_PRIMARY_KEYWORDS,
          value: item || []
        });
      });
    runChromeUtilWithSafeGaurdAsync(() => getItemFromStorageByKey(STORAGE_NAMESPACES.SECONDARY_KEYWORDS))
      .then((item) => {
        dispatch({
          type: KEYWORDS_ACTIONS.SET_SECONDARY_KEYWORDS,
          value: item || []
        });
      });
    runChromeUtilWithSafeGaurdAsync(() => getItemFromStorageByKey(STORAGE_NAMESPACES.EXCLUSION_KEYWORDS))
      .then((item) => {
        dispatch({
          type: KEYWORDS_ACTIONS.SET_EXCLUSION_KEYWORDS,
          value: item || []
        });
      });
  }, []);

  /**
   * add an item to keywordList
   * @param item 
   */
  const addItemToPrimary = (item: string) => {
    const updatedList = [...primaryKeywords, item];
    setItemToStorageByKey(STORAGE_NAMESPACES.PRIMARY_KEYWORDS, updatedList);
    dispatch({
      type: KEYWORDS_ACTIONS.SET_PRIMARY_KEYWORDS,
      value: updatedList,
    });
  };

  /**
   * add an item to keywordList
   * @param item 
   */
  const addItemToSecondary = (item: string) => {
    const updatedList = [...secondaryKeywords, item];
    setItemToStorageByKey(STORAGE_NAMESPACES.SECONDARY_KEYWORDS, updatedList);
    dispatch({
      type: KEYWORDS_ACTIONS.SET_SECONDARY_KEYWORDS,
      value: updatedList,
    });
  };

  /**
   * add an item to keywordList
   * @param item 
   */
  const addItemToExclude = (item: string) => {
    const updatedList = [...exclusionKeywords, item];
    setItemToStorageByKey(STORAGE_NAMESPACES.EXCLUSION_KEYWORDS, updatedList);
    dispatch({
      type: KEYWORDS_ACTIONS.SET_EXCLUSION_KEYWORDS,
      value: updatedList,
    });
  };

  /**
   * remove an item from keywordList by index
   * @param index 
   */
  const removeItemFromPrimary = (index: number) => {
    const updatedList = primaryKeywords.filter((value, i) => i !== index);
    setItemToStorageByKey(STORAGE_NAMESPACES.PRIMARY_KEYWORDS, updatedList);
    dispatch({
      type: KEYWORDS_ACTIONS.SET_PRIMARY_KEYWORDS,
      value: updatedList,
    });
  };

  /**
   * remove an item from keywordList by index
   * @param index 
   */
  const removeItemFromSecondary = (index: number) => {
    const updatedList = secondaryKeywords.filter((value, i) => i !== index);
    setItemToStorageByKey(STORAGE_NAMESPACES.SECONDARY_KEYWORDS, updatedList);
    dispatch({
      type: KEYWORDS_ACTIONS.SET_SECONDARY_KEYWORDS,
      value: updatedList,
    });
  };

  /**
   * remove an item from keywordList by index
   * @param index 
   */
  const removeItemFromExcluded = (index: number) => {
    const updatedList = exclusionKeywords.filter((value, i) => i !== index);
    setItemToStorageByKey(STORAGE_NAMESPACES.EXCLUSION_KEYWORDS, updatedList);
    dispatch({
      type: KEYWORDS_ACTIONS.SET_EXCLUSION_KEYWORDS,
      value: updatedList,
    });
  };

  return (
    <List>
      <ListItem>
        <div style={{display: 'block'}}>
          <Typography variant="subtitle1" gutterBottom>
            Primary Keywords:
          </Typography>
          <KeywordsContainer >
            {primaryKeywords.map((value, index) => {
              return <KeywordChip key={index} label={value} onRemove={() => removeItemFromPrimary(index)} />;
            })}
            <KeywordInput onSubmit={addItemToPrimary}/>
          </KeywordsContainer>
        </div>
      </ListItem>
      <Divider />
      <ListItem>
        <div style={{display: 'block'}}>
          <Typography variant="subtitle1" gutterBottom>
            Secondary Keywords:
          </Typography>
          <KeywordsContainer >
            {secondaryKeywords.map((value, index) => {
              return <KeywordChip key={index} label={value} onRemove={() => removeItemFromSecondary(index)} />;
            })}
            <KeywordInput onSubmit={addItemToSecondary}/>
          </KeywordsContainer>
        </div>
      </ListItem>
      <Divider />
      <ListItem>
        <div style={{display: 'block'}}>
          <Typography variant="subtitle1" gutterBottom>
            Excluded Keywords:
          </Typography>
          <KeywordsContainer >
            {exclusionKeywords.map((value, index) => {
              return <KeywordChip key={index} label={value} onRemove={() => removeItemFromExcluded(index)} />;
            })}
            <KeywordInput onSubmit={addItemToExclude}/>
          </KeywordsContainer>
        </div>
      </ListItem>
    </List>
  );
};

export default KeywordList;