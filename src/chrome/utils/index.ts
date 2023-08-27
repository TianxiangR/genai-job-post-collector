import { DelayOptions, MatchOptions } from "./types";

const promptTemplate = `I'll give you a job description that starts with #job_description_start and ends with #job_description_end, and an array of keywords. Please tell me if the job description matches the keywords. Please response with either 'true' or 'false'

#job_description_start
{jobTitle}
{jobdescription}
#job_description_end

keywords = {keywords}
`;

const supportedWebSites = ["https://ca.indeed.com"];

const API_KEY = '';

export const log = (...args: Array<any>) => console.log("[genai-job-post-collector]: ", ...args);


/**
 * 
 * @param {object} matchOptions
 * @returns {string}
 */
export const constructPrompt = (matchOptions: MatchOptions) => {
  const { jobTitle, jobDescription, keywords } = matchOptions;
  const keywordsString = '[' + keywords.reduce((v) => "'" + v + "'", '');
  const prompt = promptTemplate.replace('{jobTitle}', jobTitle).replace('{jobdescription}', jobDescription).replace('{keywords}', keywordsString);

  return prompt;
};

/**
 * starts a chat completion, returns an OpenAI API promise
 * @param {string} message 
 */
const startChatCompletion = async (message: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: message}],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    })
  };

  return fetch('https://api.openai.com/v1/chat/completions', options);
};

/**
 * 
 * @param matchOptions 
 * @returns 
 */
export const genAiJobMatching = async (matchOptions: MatchOptions) => {
  const prompt = constructPrompt(matchOptions);

  const response = await startChatCompletion(prompt).catch((reason) => log("OpenAI request fail with reason: ", reason));
  const data = await response?.json();
  return data.choices?.[0]?.message?.content || '';
};

/**
 * Pause the script for certain time in miliseconds
 * @param {number} delayInms 
 * @returns 
 */
export const delay = (delayInms: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

/**
 * run a callback with number of retry and delay
 */
export async function runWithRetryAndDelay<T> (callback: () => T | null | undefined, options: DelayOptions): Promise<T> {
  const { retry = 0, delayTime = 0 } = options;
  const rval = callback();
  if (!rval) {
    if (retry > 0) {
      if (delayTime) {
        await delay(delayTime);
      }
      return await runWithRetryAndDelay(callback, { retry: retry - 1, delayTime});
    }
    return null as T;
  }
  return rval;
}
