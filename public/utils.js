import OpenAI from 'openai';

const apiKey = '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';

const openai = new OpenAI({ apiKey });

const promptTemplate = 
`I'll give you a job description that starts with #job_description_start and ends with #job_description_end, and an array of keywords. Please tell me if the job description matches the keywords. Please response with either 'true' or 'false'

#job_description_start
{jobdescription}
#job_description_end

keywords = {keywords}
`;

/**
 * 
 * @param {string} jobDescription 
 * @param {Array<string>} keywords 
 * @returns {string}
 */
const constructPrompt = (jobDescription, keywords) => {
  const keywordsString = '[' + keywords.reduce((v) => "'" + v + "'", '');
  const prompt = promptTemplate.replace('{jobdescription}', jobDescription).replace('{keywords}', keywordsString);
};

/**
 * starts a chat completion, returns an OpenAI API promise
 * @param {string} message 
 */
const startChatCompletion = async (message) => {
  return openai.chat.completions.create({
    messages: [{ role: 'user', content: message}],
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
  });
};

/**
 * 
 * @param {*} jobDescription 
 * @param {*} keywords 
 */
const genAiJobMatching = async (jobDescription, keywords) => {
  const prompt = constructPrompt(jobDescription, keywords);

  try {
    const response = await startChatCompletion(prompt);
    return response.choices?.[0]?.message || '';
  } catch (e) {
    console.log("OpenAI request fail with reason: ", e);
  }
  return '';
};

export default genAiJobMatching;
