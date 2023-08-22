
const startGenAiJobPostCollector = () => {
  chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    function printTitle() {
      const title = document.title;
      console.log(title);
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id || 0},
      func: printTitle,
    });
  });
  
};

export default startGenAiJobPostCollector;
