const API_KEY = '';

const promptTemplate = `I'll give you a job description that starts with #job_description_start and ends with #job_description_end, and an array of keywords. Please tell me if the job description matches the keywords. Please response with either 'true' or 'false'

#job_description_start
{jobTitle}
{jobdescription}
#job_description_end

keywords = {keywords}
`;

const log = (msg) => console.log("[genai-job-post-collector]: ", msg);

/**
 * 
 * @param {object} matchOptions
 * @returns {string}
 */
const constructPrompt = (matchOptions) => {
  const { jobTitle, jobDescription, keywords } = matchOptions;
  const keywordsString = '[' + keywords.reduce((v) => "'" + v + "'", '');
  const prompt = promptTemplate.replace('{jobTitle}', jobTitle).replace('{jobdescription}', jobDescription).replace('{keywords}', keywordsString);

  return prompt;
};

const supportedWebSites = ["https://ca.indeed.com"];

/**
 * starts a chat completion, returns an OpenAI API promise
 * @param {string} message 
 */
const startChatCompletion = async (message) => {
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
 * @param {object} matchOptions
 * @param {*} keywords 
 */
const genAiJobMatching = async (matchOptions) => {
  const prompt = constructPrompt(matchOptions);

  try {
    const response = await startChatCompletion(prompt);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (e) {
    log("OpenAI request fail with reason: ", e);
  }
  return '';
};

/**
 * Pause the script for certain time in miliseconds
 * @param {number} delayInms 
 * @returns 
 */
const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

/**
 * run a callback with number of retry and delay
 */
const runWithRetryAndDelay = async (callback, options) => {
  const { retry = 0, delayTime = 0 } = options;
  const rval = callback();
  if (!rval) {
    if (retry > 0) {
      if (delayTime) {
        await delay(delayTime);
      }
      return await runWithRetryAndDelay(callback, { retry: retry - 1, delayTime});
    }
    return null;
  }
  return rval;
};

/**
 * 
 * @param {Array<string>} keywords 
 */
async function indeedJobCollector(keywords) {
  const jobs = document.getElementsByClassName('jobTitle');
  for(const job of jobs) {
    // jump to the job
    job.children[0].click();
    await delay(3000);
    const descriptionDiv = await runWithRetryAndDelay(() => document.getElementById('jobDescriptionText'), { retry: 3, delayTime: 1000});
    const jobTitle = job.textContent;

    if (descriptionDiv) {
      const jobDescription = descriptionDiv.textContent;
      const genAiResponse = await genAiJobMatching(jobDescription, keywords);
      console.log(`{\n\tjobTitle: ${jobTitle},\n\tgenAiResponse: ${genAiResponse}\n}`);

      // wait 20 seconds for the next API call to avoid overwhelming the service
      delay(20000);
    }
  }
}

/**
 * 
 * @param {string} url 
 */
function isSupportedWebsite(url) {
  for (const website of supportedWebSites) {
    if (url.includes(website)) {
      return true;
    }
  }

  return false;
}

/**
 * 
 */
function collectJob(url, keywords) {
  if (isSupportedWebsite(url)) {
    log("It is a supported website");
    indeedJobCollector(keywords);
  } else {
    log("It is not a supported website");
  }
}

chrome.runtime.onMessage.addListener((message) => {
  const { type, tab, keywords } = message;

  if (type === 'RUN_JOB_COLLECTOR') {
    collectJob(tab?.url || '', keywords);
  }
});
