import React from 'react';
import ReactDOM from 'react-dom/client';
import './Popup.css';
import KeywordList from './components/keyword/KeywordList';

const root = ReactDOM.createRoot(document.getElementById('react-root') as HTMLElement);

/**
 * The base component of the App
 * @param props 
 * @returns 
 */
function Popup() {
  const keywords = ['front-end', 'web', 'developer'];
  // eslint-disable-next-line require-jsdoc
  async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    console.log("current tab url: ", tab.url);
    return tab;
  }

  // eslint-disable-next-line require-jsdoc
  async function startJobCollect() {
    const activeTab = await getCurrentTab();
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id || 0, 
        { 
          type: 'RUN_JOB_COLLECTOR', 
          tab: activeTab,
          keywords,
        });
    }
  }

  return (
    <div className="App">
      <div style={{padding: '10px 10px'}}>
        <KeywordList initialList={keywords}/>
      </div>  
      <button onClick={() => {
        startJobCollect();
      }}>Start Collecting</button>
    </div>
  );  
}

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
