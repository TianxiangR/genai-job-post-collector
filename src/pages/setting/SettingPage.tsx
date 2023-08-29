import DoneIcon from '@mui/icons-material/Done';
import SettingsIcon from '@mui/icons-material/Settings';
import { Chip, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { STORAGE_NAMESPACES, getItemFromStorageByKey, runChromeUtilWithSafeGaurdAsync, setItemToStorageByKey } from '../../chromeUtils';

const ApiKeyContainer = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
`;

/**
 * 
 * @returns 
 */
const SettingPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [inputContent, setInputContent] = useState('');

  useEffect(() => {
    runChromeUtilWithSafeGaurdAsync(() => getItemFromStorageByKey(STORAGE_NAMESPACES.API_KEY))
      .then((item) => setApiKey(item || ''));
  }, []);

  const renderApiKey = () => {
    return apiKey.length > 7 ? apiKey.substring(0, 3) + '...' + apiKey.substring(apiKey.length - 4, apiKey.length) : apiKey;
  };

  const submit = () => {
    if (inputContent) {
      setApiKey(inputContent);
    }

    setInputContent('');
    setIsEditing(false);
    setItemToStorageByKey(STORAGE_NAMESPACES.API_KEY, inputContent);
  };

  const onEnterKeyDown = (e: React.KeyboardEvent<any>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      submit();
    }
  };

  const startEditing = () => {
    setInputContent(apiKey);
    setIsEditing(true);
  };

  const notEditing = <>
    <Chip label={renderApiKey()} style={{width: 'fit-content'}}/>
    <IconButton size="small" onClick={startEditing}>
      <SettingsIcon />
    </IconButton>
  </>;

  const editing = <>
    <TextField label="api-key" 
      variant="outlined" 
      size="small" 
      autoFocus 
      tabIndex={0} 
      onChange={(e) => {setInputContent(e.target.value);}} 
      onKeyDown={onEnterKeyDown}
      defaultValue={inputContent}
    />
    <IconButton color={inputContent ? 'success' : 'default'} onClick={submit}>
      <DoneIcon/>
    </IconButton>
  </>;

  return (
    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '10px'}}>
      <Typography variant='subtitle1'>
        OpenAI API Key:
      </Typography>
      <ApiKeyContainer>
        {isEditing ? editing: notEditing}
      </ApiKeyContainer>
    </div>
  );
};

export default SettingPage;