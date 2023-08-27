export type MatchOptions = {
  jobTitle: string;
  jobDescription: string;
  keywords: Array<string>;
}

export type DelayOptions = {
  retry: number;
  delayTime: number;
}