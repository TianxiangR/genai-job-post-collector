import { STORAGE_NAMESPACES, delay, genAiJobMatching, getItemFromStorageByKey, log, safeParseJson, setItemToStorageByKey } from '../utils';
import { GenAIResponse } from '../utils/types';
import { JobCallback, Keywords, ReacdOnlyList } from './types';

class BaseAdapter{
  promptTemplate = `I'll give you a job description that starts with #job_description_start and ends with #job_description_end, and an array of keywords. Please tell me if the job description matches the keywords. primary_keywords will contain the keywords that must match the job description. secondary_keywords will contain the keywods that is nice to have them semantically in the job description, but it is not mandatory. exclusion_keywords will contain the keywords that must not semantically appear in the job description. Please response with the JSON format template like this: 

{
  matches: {'true' if you think all the primary_keywords matches the job descriptoin and no keywords in exclusion_keywords semantically appears in the job description, else 'false'},
  matchingSecondaryKeywords: [{a list of keywords from secondary_keywords that matches the job description}],
  matchingExclusionKeywords: [{a list of keywords from exclusion_keywords that matches the job description}]
}

DO NOT RESPONSE ANYTHING ELSE OTHER THAN THE JSON

#job_description_start
{jobTitle}
{jobdescription}
#job_description_end

primary_keywords: 
`;

  getJobList(): ReacdOnlyList<any> {return [];}

  getJobTitleByIndex(idx: number, jobList: ReacdOnlyList<any>): string {return jobList[idx];}

  getCompanyNameByIndex(idx: number, jobList: ReacdOnlyList<any>): string {return jobList[idx];}

  getCompanyLocationByIndex(idx: number, jobList: ReacdOnlyList<any>): string {return jobList[idx];}

  jumpToJobPageByIndex(idx: number, jobList: ReacdOnlyList<any>){}

  async getJobDescriptionByIndex(idx: number, jobList:ReacdOnlyList<any>): Promise<string> {return Promise.resolve(jobList[idx]);}

  /**
   * start collecting
   */
  async start(callback: JobCallback) {
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
        if (matches) {
          storedJobs = [...storedJobs, jobInfo];
          await setItemToStorageByKey(STORAGE_NAMESPACES.JOB_INFOS, storedJobs);
          log('Message sent to popup script');
        }
        
      } catch(e) {
        log('OpenAI API failed with', e);
      }
      finally {
        // wait 20 seconds for the next API call to avoid overwhelming the service
        await delay(20000);
      }
    }
  }
}

export default BaseAdapter;