import { ElectricBolt } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { getCurrentTab, runChromeUtilWithSafeGaurdAsync } from '../../chromeUtils';
import KeywordList from '../../components/keyword/KeywordList';
import { useStateContext } from '../../hooks/useStateContext';
import { STATE_ACTIONS } from '../../reducers/stateReducer';

/**
 * 
 * @returns 
 */
const MainPage = () => {
  const primaryKeywords = ['front-end', 'web', 'developer'];
  const [state, dispatch] = useStateContext();
  

  // eslint-disable-next-line require-jsdoc
  async function startJobCollect() {
    const activeTab = await runChromeUtilWithSafeGaurdAsync(() => getCurrentTab());
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab?.id || 0, 
        { 
          type: 'RUN_JOB_COLLECTOR', 
          tab: activeTab,
          keywords: primaryKeywords,
        });
    }

    dispatch({
      type: STATE_ACTIONS.COLLECTOR_START
    });
  }

  return (
    <div>
      <KeywordList/>
      <LoadingButton
        size="small"
        onClick={startJobCollect}
        loading={state.isCollecting}
        loadingPosition="start"
        startIcon={<ElectricBolt />}
        variant="contained"
      >
        <span>Start Collecting</span>
      </LoadingButton>
    </div>
  );
};

export default MainPage;