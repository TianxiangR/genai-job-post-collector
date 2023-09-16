import { Keywords } from "../adapters/types";

export type MatchOptions = {
  jobTitle: string;
  jobDescription: string;
  keywords: Keywords;
  signal?: AbortSignal;
}

export type DelayOptions = {
  retry: number;
  delayTime: number;
}

export type GenAIResponse = {
  matches?: boolean;
  matchedSecondaryKeywords?: string[];
  matchedExclusionKeywords?: string[];
}