import { log } from '../utils';
import { MatchOptions } from './types';

class BaseAdapter {
  
  keywords: Array<string> = [];
  API_KEY = '';
  promptTemplate = `I'll give you a job description that starts with #job_description_start and ends with #job_description_end, and an array of keywords. Please tell me if the job description matches the keywords. Please response with either 'true' or 'false'

#job_description_start
{jobTitle}
{jobdescription}
#job_description_end

keywords = {keywords}
`;

  constructPrompt = (matchOptions: MatchOptions) => {
    const { jobTitle, jobDescription, keywords } = matchOptions;
    const keywordsString = '[' + keywords.reduce((v) => "'" + v + "'", '');
    const prompt = this.promptTemplate.replace('{jobTitle}', jobTitle).replace('{jobdescription}', jobDescription).replace('{keywords}', keywordsString);
  
    return prompt;
  };

  start(): void {}

  startChatCompletion(message: string){
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message}],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
      })
    };
  
    return fetch('https://api.openai.com/v1/chat/completions', options);
  }

  async genAiJobMatching(matchOptions: MatchOptions){
    const prompt = this.constructPrompt(matchOptions);
  
    try {
      const response = await this.startChatCompletion(prompt);
      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    } catch (e) {
      log("OpenAI request fail with reason: ", e);
    }
    return '';
  }
}

export default BaseAdapter;