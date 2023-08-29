import { runWithRetryAndDelay } from "../../utils";
import BaseAdapter from "../BaseAdapter";


/**
 * Indeed Adapter
 */
class IndeedAdapter extends BaseAdapter {
  adapterName = 'Indeed';

  getJobList() {
    return document.getElementsByClassName("jobCard_mainContent");
  }

  getJobTitleByIndex(idx: number, jobList: HTMLCollectionOf<Element>): string {
    const jobCard = jobList[idx];
    return jobCard?.getElementsByClassName('jobTitle')?.[0].textContent || 'Unknown';
  }

  getCompanyLocationByIndex(idx: number, jobList: HTMLCollectionOf<Element>): string {
    const jobCard = jobList[idx];
    const companyInfo = jobCard?.getElementsByClassName('companyInfo')?.[0];
    return companyInfo?.getElementsByClassName('companyName')?.[0].textContent || 'Unknown';
  }

  getCompanyNameByIndex(idx: number, jobList: HTMLCollectionOf<Element>): string {
    const jobCard = jobList[idx];
    const companyInfo = jobCard?.getElementsByClassName('companyInfo')?.[0];
    return companyInfo?.getElementsByClassName('companyLocation')?.[0].textContent || 'Unknown';
  }

  jumpToJobPageByIndex(idx: number, jobList: HTMLCollectionOf<Element>): void {
    const jobCard = jobList[idx];
    const jobTitleDiv = jobCard?.getElementsByClassName('jobTitle')?.[0];
    const jobTitleAnchor = jobTitleDiv?.children?.[0] as HTMLElement;

    jobTitleAnchor?.click();
  }

  async getJobDescriptionByIndex(idx: number, jobList: HTMLCollectionOf<Element>): Promise<string> {
    this.jumpToJobPageByIndex(idx, jobList);
    const descriptionDiv = await runWithRetryAndDelay(() => document.getElementById('jobDescriptionText'), { retry: 3, delayTime: 1000});
    return descriptionDiv?.textContent || '';
  }
}

export default IndeedAdapter;