import { delay, genAiJobMatching, log, runWithRetryAndDelay } from "../../utils";
import BaseAdapter from "../BaseAdapter";


/**
 * Indeed Adapter
 */
class IndeedAdapter extends BaseAdapter {
  /**
   * start collecting
   */
  async start() {
    const jobs = document.getElementsByClassName('jobTitle');
    for(const job of jobs) {
      // jump to the job description
      const jobTitleAnchor = job.children[0] as HTMLElement;
      jobTitleAnchor.click();
      await delay(3000);
      const descriptionDiv = await runWithRetryAndDelay(() => document.getElementById('jobDescriptionText'), { retry: 3, delayTime: 1000});
      const jobTitle = job.textContent;
  
      if (descriptionDiv) {
        const jobDescription = descriptionDiv.textContent;

        try {
          const genAiResponse = await genAiJobMatching({
            jobTitle: jobTitle || '',
            jobDescription: jobDescription || '',
            keywords: this.keywords,
          });
          log(`{\n\tjobTitle: ${jobTitle},\n\tjobDescription: ${jobDescription},\n\tgenAiResponse: ${genAiResponse}\n}`);
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
}

export default IndeedAdapter;