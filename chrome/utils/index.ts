import { DelayOptions, MatchOptions } from "./types";

const promptTemplate = `I'll give you a job description that starts with #job_description_start and ends with #job_description_end, and an array of keywords. Please tell me if the job description matches the keywords. primary_keywords will contain the keywords that must match the job description. secondary_keywords will contain the keywods that is nice to have them semantically in the job description, but it is not mandatory. exclusion_keywords will contain the keywords that must not semantically appear in the job description. Please response with the JSON format template like this: 

{
  matches: {'true' if you think all the primary_keywords matches the job descriptoin and no keywords in exclusion_keywords semantically appears in the job description, else 'false'},
  matchingSecondaryKeywords: [{a list of keywords from the given secondary_keywords that matches the job description, do not add anything other than from the given secondary_keywords array}],
  matchingExclusionKeywords: [{a list of keywords from the given exclusion_keywords that matches the job description, do not add anything other than from the given exclusion_keywords array}]
}

DO NOT RESPONSE ANYTHING ELSE OTHER THAN THE JSON

#job_description_start
{jobTitle}
{jobdescription}
#job_description_end

primary_keywords: [{primaryKeywords}];
secondary_keywords: [{secondaryKeywords}];
exclusion_keywords: [{exclusionKeywords}];
`;

export const log = (...args: Array<any>) => console.log("[genai-job-post-collector]: ", ...args);


/**
 * 
 * @param {object} matchOptions
 * @returns {string}
 */
export const constructPrompt = (matchOptions: MatchOptions) => {
  const { jobTitle, jobDescription, keywords } = matchOptions;
  const primaryKeywordsString = keywords.primaryKeywords.reduce((prev, curr) => prev + "'" + curr + "'", '') ;
  const secondaryKeywordsString = keywords.secondaryKeywords.reduce((prev, curr) => prev + "'" + curr + "'", '');
  const exclusionKeywordsString = keywords.exclusionKeywords.reduce((prev, curr) => prev + "'" + curr + "'", '');
  const prompt = promptTemplate.replace('{jobTitle}', jobTitle)
    .replace('{jobdescription}', jobDescription)
    .replace('{primaryKeywords}', primaryKeywordsString)
    .replace('{secondaryKeywords}', secondaryKeywordsString)
    .replace('{exclusionKeywords}', exclusionKeywordsString);

  return prompt;
};

/**
 * starts a chat completion, returns an OpenAI API promise
 * @param {string} message 
 */
const startChatCompletion = async (message: string, apiKey: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: message}],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    })
  };

  return await fetch('https://api.openai.com/v1/chat/completions', options);
};

/**
 * 
 * @param matchOptions 
 * @returns 
 */
export const genAiJobMatching = async (matchOptions: MatchOptions, apiKey: string) => {
  const prompt = constructPrompt(matchOptions);

  const response = await startChatCompletion(prompt, apiKey).catch((reason) => log("OpenAI request fail with reason: ", reason));
  const data = await response?.json();
  return data.choices?.[0]?.message?.content || '';
};


/**
 * wraping JSON.parse with try-catch to avoid Error
 * @param text 
 * @returns 
 */
export const safeParseJson = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
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


export async function getItemFromStorageByKey(key: string, defaultValue?: unknown = null) {
  const item = await chrome.storage.local.get(key);
  return item?.[key] || defaultValue;
}

/**
 * 
 * @param key 
 * @param value 
 * @returns 
 */
export function setItemToStorageByKey(key: string, value: any) {
  const objToStore = {
    [key]: value
  };
  return chrome.storage?.local.set(objToStore);
}

export const STORAGE_NAMESPACES = {
  PRIMARY_KEYWORDS: 'PRIMARY_KEYWORDS',
  SECONDARY_KEYWORDS: 'SECONDARY_KEYWORDS',
  EXCLUSION_KEYWORDS: 'EXCLUSION_KEYWORDS',
  API_KEY: 'API_KEY',
  JOB_INFOS: 'JOB_INFOS'
};
