/**
 * log info related to genai-job-post-collector extension
 * @param args 
 */
export default function log(...args: Array<unknown>){
  console.log("[genai-job-post-collector]: ", ...args);
}