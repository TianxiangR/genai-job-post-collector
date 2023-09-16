import { AugmentedJobInfo } from "../../types";

export type Order = 'asc' | 'desc';

export type SortId = keyof AugmentedJobInfo;

export type HeadCellSpec = {
  id: SortId;
  label: string;
  sortable: boolean;
}