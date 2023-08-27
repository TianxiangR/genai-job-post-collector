import BaseAdapter from "./adapters/BaseAdapter";
import IndeedAdapter from "./adapters/indeed/IndeedAdapter";
import { log } from "./utils";

type JobMap = {
  [key: string]: {
    baseUrl: string;
    adapter: BaseAdapter;
  }
}

const jobMap: JobMap = {
  indeed: {
    baseUrl: 'https://ca.indeed.com/',
    adapter: new IndeedAdapter(),
  }
};

function collectJob(tab: chrome.tabs.Tab, keywords: Array<string>) {
  log('job collect start');
  for(const key of Object.keys(jobMap)) {
    const item = jobMap[key];
    const url = tab?.url || '';
    if (url.includes(item.baseUrl)) {
      item.adapter.start();
    }
  }
}

chrome.runtime.onMessage.addListener((message: any) => {
  const { type, tab, keywords } = message;
  log('message received', message);

  if (type === 'RUN_JOB_COLLECTOR') {
    collectJob(tab || '', keywords);
  }
});