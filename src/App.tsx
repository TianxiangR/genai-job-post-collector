import React, { useEffect } from 'react';
import './App.css';
import KeywordList from './components/keyword/KeywordList';
import startGenAiJobPostCollector from './utils/startGenAiJobPostCollector';

/**
 * The base component of the App
 * @param props 
 * @returns 
 */
function App() {
  const keywords = ['front-end', 'web', 'developer', 'entry-level', 'junior'];

  useEffect(() => {
    startGenAiJobPostCollector();
  }, []);
  return (
    <div className="App">
      <div style={{padding: '10px 10px'}}>
        <KeywordList initialList={keywords}/>
      </div>  
    </div>
  );  
}

export default App;
