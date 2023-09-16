import React, { useEffect, useMemo, useState } from 'react';

import { getItemFromStorageByKey, runChromeUtilWithSafeGaurd, runChromeUtilWithSafeGaurdAsync,STORAGE_NAMESPACES } from '../../chromeUtils';
import JobTable from '../../components/jobTable/JobTable';
import { JobInfo } from '../../types';

/**
 * 
 * @returns 
 */
const JobsPage = () => {
  const [jobList, setJobList] = useState<JobInfo[]>([]);
  const augmentedJobList = useMemo(() => {
    return jobList.map((value, idx) => {
      return {
        ...value,
        id: idx
      };
    });
  }, [jobList]);

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
    <JobTable jobList={jobList} setJobList={setJobList} augmentedJobList={augmentedJobList}/>
  );
};

export default JobsPage;