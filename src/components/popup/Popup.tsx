import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Card, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StateProvider } from '../../hooks/useStateContext';
import JobsPage from '../../pages/jobs/JobsPage';
import SampleTablePage from '../../pages/jobs/SampleTablePage';
import MainPage from '../../pages/main/MainPage';
import SettingPage from '../../pages/setting/SettingPage';
import { log } from '../../utils';
import './Popup.css';
import { runChromeUtilWithSafeGaurdAsync, setItemToStorageByKey } from '../../chromeUtils';


/**
 * The base component of the App
 * @param props 
 * @returns 
 */
function Popup() {
  const [tabValue, setTabValue] = useState<string>('1');

  const updatedStoredJobs = 

  useEffect(() => {
    chrome?.runtime?.onMessage?.addListener?.((message) => {
      switch(message.type) {
      case 'ADD_JOB_INFO':
        log('received message from content-script', message.value);
        break;
      default:
      }
    });
  }, []);

  /**
   * 
   * @param event 
   * @param newValue 
   */
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <StateProvider>
      <div className="App">
        <Card sx={{minHeight:  '100%'}}>
          <TabContext value={tabValue}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Main" value="1" />
              <Tab label="Jobs" value="2" />
              <Tab label="Setting" value="3" />
              <Tab label="Sample" value="4" />
            </TabList>
            <TabPanel value="1">
              <MainPage />
            </TabPanel>
            <TabPanel value="2">
              <JobsPage />
            </TabPanel>
            <TabPanel value="3">
              <SettingPage />
            </TabPanel>
            <TabPanel value="4">
              <SampleTablePage />
            </TabPanel>
          </TabContext>
        </Card>
      </div>
    </StateProvider>
  );  
}

export default Popup;