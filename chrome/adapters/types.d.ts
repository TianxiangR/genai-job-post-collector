export interface IJobCollectorAdapter {
  start: (callback?: JobCallback) => Promise<void>;
}

export type JobCallback = (jobInfo: JobInfo) => void

export type JobInfo = {
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  keywords: Keywords;
}

export type Keywords = {
  primaryKeywords: Array<string>;
  secondaryKeywords: Array<string>;
  exclusionKeywords: Array<string>;
}

export type MatchOptions = {
  jobTitle: string;
  jobDescription: string;
  keywords: Keywords;
}

export type ReacdOnlyList<T> = {
  readonly [index: number]: T;
  readonly length: number;
}