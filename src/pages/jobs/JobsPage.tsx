import React, { useEffect, useState } from 'react';
import { STORAGE_NAMESPACES, getItemFromStorageByKey, runChromeUtilWithSafeGaurd, runChromeUtilWithSafeGaurdAsync } from '../../chromeUtils';
import JobTable from '../../components/jobTable/JobTable';
import { JobInfo } from '../../types';

/**
 * 
 * @returns 
 */
const JobsPage = () => {
  const [jobList, setJobList] = useState<JobInfo[]>([]);

  /**
   * listen to storage change and update job list
   */
  const listenToStorageChange = () => {
    chrome.storage.local.onChanged.addListener((changes) => {
      setJobList(changes[STORAGE_NAMESPACES.JOB_INFOS].newValue || []);
    });
  };

  useEffect(() => {
    runChromeUtilWithSafeGaurdAsync(() => getItemFromStorageByKey(STORAGE_NAMESPACES.JOB_INFOS)).then((value) => setJobList(value || []));
    runChromeUtilWithSafeGaurd(listenToStorageChange);
  }, []);

  return (
    <JobTable jobList={jobList} setJobList={setJobList}/>
  );
};

export default JobsPage;