import { JobInfo } from "../../types";

export type Order = 'asc' | 'desc';

export type SortId = keyof JobInfo | 'id';

export type HeadCellSpec = {
  id: SortId;
  label: string;
  sortable: boolean;
}