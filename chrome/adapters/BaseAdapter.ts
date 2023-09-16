import { delay, genAiJobMatching, getItemFromStorageByKey, log, safeParseJson, setItemToStorageByKey, STORAGE_NAMESPACES } from '../utils';
import { GenAIResponse } from '../utils/types';
import { JobCallback, Keywords, ReacdOnlyList } from './types';

class BaseAdapter{
  getJobList(): ReacdOnlyList<any> {return [];}

  getJobTitleByIndex(idx: number, jobList: ReacdOnlyList<any>): string {return jobList?.[idx];}

  getCompanyNameByIndex(idx: number, jobList: ReacdOnlyList<any>): string {return jobList?.[idx];}

  getCompanyLocationByIndex(idx: number, jobList: ReacdOnlyList<any>): string {return jobList?.[idx];}

  jumpToJobPageByIndex(idx: number, jobList: ReacdOnlyList<any>){}

  async getJobDescriptionByIndex(idx: number, jobList:ReacdOnlyList<any>): Promise<string> {return Promise.resolve(jobList?.[idx]);}

  /**
   * start collecting
   */
  async start(options? : {callback?: JobCallback, signal?: AbortSignal}) {
    const signal = options?.signal;
    const jobs = this.getJobList();
    const apiKey = await getItemFromStorageByKey(STORAGE_NAMESPACES.API_KEY);
    for(let i = 0; i < jobs.length; i++) {
      const jobTitle = this.getJobTitleByIndex(i, jobs);
      const companyName = this.getCompanyNameByIndex(i, jobs);
      const companyLocation = this.getCompanyLocationByIndex(i, jobs);
      const jobDescription = await this.getJobDescriptionByIndex(i, jobs);
      const primaryKeywords = await getItemFromStorageByKey(STORAGE_NAMESPACES.PRIMARY_KEYWORDS);
      const secondaryKeywords = await getItemFromStorageByKey(STORAGE_NAMESPACES.SECONDARY_KEYWORDS);
      const exclusionKeywords = await getItemFromStorageByKey(STORAGE_NAMESPACES.EXCLUSION_KEYWORDS);
      const keywords: Keywords = {
        primaryKeywords,
        secondaryKeywords,
        exclusionKeywords
      };
      let storedJobs = await getItemFromStorageByKey(STORAGE_NAMESPACES.JOB_INFOS, []);
  
      try {
        const response = await genAiJobMatching({
          jobTitle: jobTitle || '',
          jobDescription: jobDescription || '',
          keywords,
        }, apiKey);
        log(`{\n\tjobTitle: ${jobTitle},\n\tgenAiResponse: ${response}\n}`);
  
        const parsedResponse: GenAIResponse = safeParseJson(response);

        log(`parsedResponse ${parsedResponse}`);
        const { matches, matchedSecondaryKeywords } = parsedResponse;
        const jobInfo = {
          jobTitle,
          companyName,
          companyLocation,
          primaryKeywords,
          matchedSecondaryKeywords,
          url: window.location.href || ''
        };
        if (matches && !signal?.aborted) {
          storedJobs = [...storedJobs, jobInfo];
          await setItemToStorageByKey(STORAGE_NAMESPACES.JOB_INFOS, storedJobs);
          log('Message sent to popup script');
        }

        if (signal?.aborted) {
          log('Job Matching interapted');
          return Promise.resolve();
        }
        
      } catch(e) {
        log('OpenAI API failed with', e);
      }
      finally {
        // wait 5 seconds for the next API call to avoid overwhelming the service
        await delay(5000);
      }
    }
  }
}

export default BaseAdapter;