export interface IJobCollectorAdapter {
  start: () => Promise<>;
}

export type MatchOptions = {
  jobTitle: string;
  jobDescription: string;
  keywords: Array<string>;
}