
const startGenAiJobPostCollector = async () => {
  chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    function printTitle() {
      const title = document.title;
      console.log(title);
    }
    printTitle();
  });
  
};

export default startGenAiJobPostCollector;
